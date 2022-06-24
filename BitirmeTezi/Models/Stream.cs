using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace BitirmeTezi.Models
{
    public class Stream
    {       
        public int Id { get; set; }
        public string URL { get; set; }
        public string Category { get; set; }
        public int StreamerId { get; set; }
        public string Subtitle { get; set; }
    }
}
