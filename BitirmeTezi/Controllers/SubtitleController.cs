using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using Xabe.FFmpeg;
using System.IO; 

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BitirmeTezi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubtitleController : ControllerBase
    {
        // GET: api/<SubtitleController>
        [HttpGet]
        public async void Get()
        {
            //using (var client = new WebClient())
            //{
            //    string url = "http://20.54.150.204:8080/hls/test-20.ts";
            //    await client.DownloadFileTaskAsync(new System.Uri(url), "file.ts");
            //}
            string currentDirectory = Directory.GetCurrentDirectory();
            //string input = Path.Combine(Directory.GetParent(currentDirectory).FullName, "file.ts");
            //string output = Path.Combine(Directory.GetParent(currentDirectory).FullName, "file.mp4");

            //await FFmpeg.Conversions.FromSnippet.Convert(input, output);

            var mediaInfo = await FFmpeg.GetMediaInfo(Path.Combine(currentDirectory,"file.ts"));
            string output = Path.Combine(currentDirectory, "test.mp3");
            var conversion = await FFmpeg.Conversions.FromSnippet.ExtractAudio(mediaInfo.Path, output);

            //conversion.Start();

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
