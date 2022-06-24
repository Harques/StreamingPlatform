using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BitirmeTezi.Models
{
    public class User
    {        
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string StreamKey { get; set; }       
        public DateTime LastLoginDate { get; set; }
    }
}
