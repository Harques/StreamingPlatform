using AutoMapper;
using BitirmeTezi.Dtos;
using BitirmeTezi.Models;

namespace BitirmeTezi.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDetailDto>();
            CreateMap<Stream, StreamDetailDto>();
        }
    }
}
