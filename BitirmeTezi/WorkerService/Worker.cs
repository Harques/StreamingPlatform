using Google.Cloud.Speech.V1;
using Microsoft.Extensions.Hosting;
using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Google.Api.Gax.Grpc;
using static Google.Cloud.Speech.V1.SpeechClient;
using BitirmeTezi.Controllers;
using System.Runtime.InteropServices;
using Microsoft.Extensions.Logging;

namespace BitirmeTezi.WorkerService
{
    public class Worker : BackgroundService
    {
        private static System.Timers.Timer aTimer;
        private static StreamingRecognizeStream streamingCall;
        private readonly ILogger<Worker> _logger;

        public Worker(ILogger<Worker> logger) =>
            _logger = logger;

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                string currentDirectory = Directory.GetCurrentDirectory();
                MemoryStream ms = new MemoryStream();

                Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "./keys.json");
                var speech = SpeechClient.Create();
                var config = new RecognitionConfig
                {
                    Encoding = RecognitionConfig.Types.AudioEncoding.Flac,
                    SampleRateHertz = 48000,
                    LanguageCode = LanguageCodes.Turkish.Turkey,
                    AudioChannelCount = 2,
                };

                streamingCall = speech.StreamingRecognize();

                await streamingCall.WriteAsync(
                     new StreamingRecognizeRequest()
                     {
                         StreamingConfig = new StreamingRecognitionConfig()
                         {
                             Config = config,
                             InterimResults = true,
                         }
                     });

                Process proc = new Process();
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
                {
                    proc.StartInfo.FileName = "/app/FFmpeg/ffmpeg";
                }
                else
                {
                    proc.StartInfo.FileName = Path.Combine(currentDirectory, "FFmpeg\\ffmpeg.exe");
                }

                proc.StartInfo.Arguments = "-i http://20.101.175.16:8080/hls/test.m3u8 -f flac pipe:1";
                proc.StartInfo.UseShellExecute = false;
                proc.StartInfo.RedirectStandardInput = true;
                proc.StartInfo.RedirectStandardOutput = true;

                proc.Start();

                FileStream baseStream = proc.StandardOutput.BaseStream as FileStream;
                byte[] audioData;
                int lastRead = 0;
                bool firstTime = true;

                byte[] buffer = new byte[17500];
                do
                {
                    lastRead = baseStream.Read(buffer, 0, buffer.Length);
                    ms.Write(buffer, 0, lastRead);
                    if (ms.Length == 0) break;
                    audioData = ms.ToArray();

                    try
                    {
                        streamingCall.WriteAsync(
                        new StreamingRecognizeRequest()
                        {
                            AudioContent = Google.Protobuf.ByteString.CopyFrom(buffer, 0, lastRead)
                        }).Wait();
                    }
                    catch (Exception ex)
                    {
                        if (ex.Message.Contains("Exceeded maximum allowed stream duration of 305 seconds.") || ex.Message.Contains("Audio should be sent close to real time.")) break;
                        Debug.WriteLine(ex.Message);
                        _logger.LogError(ex.Message);
                    }

                    if (firstTime)
                    {
                        firstTime = false;

                        aTimer = new System.Timers.Timer();
                        aTimer.Interval = 1000;

                        // Hook up the Elapsed event for the timer. 
                        aTimer.Elapsed += OnTimedEvent;

                        aTimer.Enabled = true;
                    }

                    /*using (FileStream s = new FileStream(Path.Combine(currentDirectory, "pipe_output_01.flac"), FileMode.Create))
                    {
                        s.Write(audioData, 0, audioData.Length);
                    }*/

                } while (lastRead > 0);
                await Task.Delay(0, stoppingToken);
            }
        }
        private static void OnTimedEvent(Object source, System.Timers.ElapsedEventArgs e)
        {
            Task responseHandlerTask = Task.Run(async () =>
            {
                // Note that C# 8 code can use await foreach
                try
                {
                    string saidWhat = "";
                    //string lastSaidWhat = "";
                    AsyncResponseStream<StreamingRecognizeResponse> responseStream = streamingCall.GetResponseStream();
                    while (await responseStream.MoveNextAsync())
                    {
                        saidWhat = responseStream.Current.Results[0].Alternatives[0].Transcript;
                        if (SubtitleController.lastSaidWhat != saidWhat)
                        {
                            Debug.WriteLine(saidWhat);
                            SubtitleController.lastSaidWhat = saidWhat;
                        }
                        // Do something with streamed response
                    }
                }
                catch (Exception ex)
                {
                    //Debug.WriteLine(ex.Message);
                }

                // The response stream has completed
            });

            responseHandlerTask.Wait();
            // Debug.WriteLine("The Elapsed event was raised at {0}", e.SignalTime);
        }
    }
}
