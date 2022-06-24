﻿using System;

namespace BitirmeTezi.Dtos
{
    public class UserDetailDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }        
        public string StreamKey { get; set; }
        public DateTime LastLoginDate { get; set; }
        public string Token { get; set; }
    }
}
