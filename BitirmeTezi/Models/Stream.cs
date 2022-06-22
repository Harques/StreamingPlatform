using System.Collections.Generic;

namespace BitirmeTezi.Models
{
    public class Stream
    {
        public Stream()
        {
            this.Viewers = new HashSet<User>();
        }

        public int Id { get; set; }
        public string URL { get; set; }
        public string Category { get; set; }
        public int StreamerId { get; set; }
        public virtual ICollection<User> Viewers { get; set; }
    }
}
