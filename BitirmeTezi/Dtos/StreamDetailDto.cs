using BitirmeTezi.Models;

namespace BitirmeTezi.Dtos
{
    public class StreamDetailDto
    {
        public int Id { get; set; }
        public string URL { get; set; }
        public string Category { get; set; }
        public StreamerDetailDto Streamer { get; set; }
        public string Subtitle { get; set; }
    }
}
