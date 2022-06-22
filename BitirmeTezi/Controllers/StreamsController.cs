using AutoMapper;
using BitirmeTezi.Dtos;
using BitirmeTezi.Models;
using BitirmeTezi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
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

        public StreamsController(IAppRepository appRepository, IMapper mapper, IConfiguration configuration)
        {            
            this.appRepository = appRepository;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        [HttpGet]
        [Route("")]
        public ActionResult GetAllStreams()
        {
            var streamsToReturn = mapper.Map<List<StreamDetailDto>>(appRepository.getAllStreams());
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
            };

            var createdStream = await appRepository.startStream(streamToCreate);
            var streamToReturn = mapper.Map<StreamDetailDto>(createdStream);
            return Ok(streamToReturn);
        }
    }
}
