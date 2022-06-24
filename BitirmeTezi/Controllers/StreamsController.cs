using AutoMapper;
using BitirmeTezi.Dtos;
using BitirmeTezi.Models;
using BitirmeTezi.Repositories;
using BitirmeTezi.WorkerService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;

namespace BitirmeTezi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreamsController : ControllerBase
    {
        private IAppRepository appRepository;
        private IMapper mapper;
        private IConfiguration configuration;
        private IServiceScopeFactory serviceScopeFactory;
        private static Dictionary<int, Worker> workers;

        public StreamsController(IAppRepository appRepository, IMapper mapper, IConfiguration configuration, IServiceScopeFactory serviceScopeFactory)
        {            
            this.appRepository = appRepository;
            this.mapper = mapper;
            this.configuration = configuration;
            this.serviceScopeFactory = serviceScopeFactory;
            workers = new Dictionary<int, Worker>();
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAllStreams()
        {
            var streams = appRepository.getAllStreams();
            var streamsToReturn = mapper.Map<List<StreamDetailDto>>(streams);

            for (var i = 0; i < streamsToReturn.Count; i++)
            {
                streamsToReturn[i].Streamer = mapper.Map<StreamerDetailDto>(await appRepository.findUserById(streams[i].StreamerId));
            }

            return Ok(streamsToReturn);
        }

        [HttpPost]
        [Route("startStream")]
        public async Task<IActionResult> StartStream([FromBody] StartStreamDto startStreamDto)
        {            
            var streamToCreate = new Stream
            {
                URL = startStreamDto.URL,
                Category = startStreamDto.Category,
                StreamerId = startStreamDto.StreamerId,
                Subtitle = ""
            };

            var createdStream = await appRepository.startStream(streamToCreate);
            var streamToReturn = mapper.Map<StreamDetailDto>(createdStream);
            streamToReturn.Streamer = mapper.Map<StreamerDetailDto>(await appRepository.findUserById(startStreamDto.StreamerId));

            Worker worker = new Worker(createdStream, serviceScopeFactory);
            worker.StartAsync(new CancellationToken());            
            workers.Add(createdStream.Id, worker);
            return Ok(streamToReturn);
        }

        [HttpPost]
        [Route("endStream/{id}")]
        public async Task<IActionResult> EndStream(int id)
        {
            appRepository.endStream(id);
            if (appRepository.SaveAll())
            {
                workers.Remove(id);
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet]
        [Route("getStreamKey/{username}")]
        public ActionResult getStreamKey(string username)
        {
            var user = appRepository.findUserByUsername(username);
            var userToReturn = mapper.Map<StreamKeyDto>(user);
            var stream = appRepository.findStreamByStreamKey(user.StreamKey);
            userToReturn.StreamId = stream.Id;
            return Ok(userToReturn);
        }

        public static Worker getWorker(int id)
        {
            return workers[id];
        }
    }
}
