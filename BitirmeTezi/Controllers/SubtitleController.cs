using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.IO;
using Google.Cloud.Speech.V1;
using System;
using System.Threading.Tasks;
using static Google.Cloud.Speech.V1.SpeechClient;
using Google.Api.Gax.Grpc;
using System.Diagnostics;
using FFMpegCore;
using FFMpegCore.Pipes;
using FFMpegCore.Enums;
using Xabe.FFmpeg;
using System.Drawing;
using System.Timers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BitirmeTezi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubtitleController : ControllerBase
    {

        private static Timer aTimer;
        private static MemoryStream ms;
        private static StreamingRecognizeStream streamingCall;

        // GET: api/<SubtitleController>
        [HttpGet]
        public async Task<string> Get()
        {            
            ms = new MemoryStream();

            string currentDirectory = Directory.GetCurrentDirectory();

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

            proc.StartInfo.FileName = Path.Combine(currentDirectory, "FFmpeg\\ffmpeg.exe");
            proc.StartInfo.Arguments = "-i http://20.54.150.204:8080/hls/test.m3u8 -f flac pipe:1";
            proc.StartInfo.UseShellExecute = false;
            proc.StartInfo.RedirectStandardInput = true;
            proc.StartInfo.RedirectStandardOutput = true;

            proc.Start();

            FileStream baseStream = proc.StandardOutput.BaseStream as FileStream;
            byte[] audioData;
            int lastRead = 0;
            bool firstTime = true;
            
            byte[] buffer = new byte[5000];
            do
            {
                lastRead = baseStream.Read(buffer, 0, buffer.Length);
                ms.Write(buffer, 0, lastRead);
                audioData = ms.ToArray();

                if (firstTime)
                {
                    firstTime = false;

                    aTimer = new Timer();
                    aTimer.Interval = 5000;

                    // Hook up the Elapsed event for the timer. 
                    aTimer.Elapsed += OnTimedEvent;

                    aTimer.Enabled = true;
                }

                /*using (FileStream s = new FileStream(Path.Combine(currentDirectory, "pipe_output_01.flac"), FileMode.Create))
                {
                    s.Write(audioData, 0, audioData.Length);
                }*/                    

            } while (lastRead > 0);
            

            return "";
        }

        private static void OnTimedEvent(Object source, ElapsedEventArgs e)
        {
            try
            {
                streamingCall.WriteAsync(
                new StreamingRecognizeRequest()
                {
                    AudioContent = Google.Protobuf.ByteString.FromStream(ms)
                }).Wait();
            } catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            
            Task responseHandlerTask = Task.Run(async () =>
            {
                // Note that C# 8 code can use await foreach
                try
                {
                    string saidWhat = "";
                    string lastSaidWhat = "";
                    AsyncResponseStream<StreamingRecognizeResponse> responseStream = streamingCall.GetResponseStream();
                    while (await responseStream.MoveNextAsync())
                    {

                        //Thread.Sleep(3000);
                        /*foreach (var result in responseStream.Current.Results)
                        {
                            foreach (var alternative in result.Alternatives)
                            {
                                saidWhat = alternative.Transcript;
                                if (lastSaidWhat != saidWhat)
                                {
                                    Debug.WriteLine(saidWhat);
                                    lastSaidWhat = saidWhat;                                                                                
                                }

                            }  // end for

                        }*/

                        saidWhat = responseStream.Current.Results[0].Alternatives[0].Transcript;
                        if (lastSaidWhat != saidWhat)
                        {
                            Debug.WriteLine(saidWhat);
                            lastSaidWhat = saidWhat;
                        }
                        // Do something with streamed response
                    }
                } catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                

                // The response stream has completed
            });
            Debug.WriteLine("The Elapsed event was raised at {0}", e.SignalTime);
        }

        // GET api/<SubtitleController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<SubtitleController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<SubtitleController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<SubtitleController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
