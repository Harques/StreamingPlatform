using AutoMapper;
using BitirmeTezi.Dtos;
using BitirmeTezi.Models;
using BitirmeTezi.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BitirmeTezi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository authRepository;
        private IAppRepository appRepository;
        private IMapper mapper;
        private IConfiguration configuration;
        private static Random random = new Random();

        public AuthController(IAuthRepository authRepository, IAppRepository appRepository, IMapper mapper, IConfiguration configuration)
        {
            this.authRepository = authRepository;
            this.appRepository = appRepository;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] UserForSignUpDto userForSignUpDto)
        {
            string email = userForSignUpDto.Email.Trim();
            string password = userForSignUpDto.Password.Trim();
            string username = userForSignUpDto.Username.Trim();

            if (await authRepository.UserExistsByEmail(email))
            {
                ModelState.AddModelError("Error", "Bu e-posta kullanımdadır.");
                return BadRequest(ModelState);
            }

            if (await authRepository.UserExistsByUsername(email))
            {
                ModelState.AddModelError("Error", "Bu kullanıcı adı kullanımdadır.");
                return BadRequest(ModelState);
            }

            if (!email.Contains("@") || !email.Contains(".") || email[email.Length - 1] < 97 || email[email.Length - 1] > 122)
            {
                ModelState.AddModelError("Error", "E-posta doğru formatta değil.");
                return BadRequest(ModelState);
            }

            if (password.Length < 6)
            {
                ModelState.AddModelError("Error", "Parola en az 6 karakterden oluşmalı.");
                return BadRequest(ModelState);
            }

            const string chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            
            string streamKey = new(Enumerable.Repeat(chars, 8)
                .Select(s => s[random.Next(s.Length)]).ToArray());

            User user = new User
            {
                Email = email,
                Username = username,                
                LastLoginDate = DateTime.Now, // TODO: Add 3 hours when deployed to azure
                StreamKey = streamKey
            };

            var createdUser = await authRepository.Register(user, password);

            string token = GetTokenString(createdUser);

            Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

            var userToReturn = mapper.Map<UserDetailDto>(createdUser);
            userToReturn.Token = token;
            return StatusCode(201, userToReturn);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            string email = userForLoginDto.Email.Trim();
            string password = userForLoginDto.Password.Trim();

            var user = await authRepository.Login(email, password);

            if (user == null)
            {
                ModelState.AddModelError("Error", "E-posta veya şifre hatalı.");
                return BadRequest(ModelState);
            }

            user.LastLoginDate = DateTime.Now; // TODO: Add 3 hours when deployed to azure

            appRepository.Update(user);

            if (appRepository.SaveAll())
            {
                string token = GetTokenString(user);

                Response.Cookies.Append("X-Access-Token", token, new CookieOptions() { HttpOnly = true, SameSite = SameSiteMode.Strict });

                var userToReturn = mapper.Map<UserDetailDto>(user);
                userToReturn.Token = token;
                return Ok(userToReturn);
            }

            return BadRequest();
        }

        private string GetTokenString(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtSettings = configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings.GetSection("secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Email)
                }),
                Expires = DateTime.Now.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256),
                Issuer = jwtSettings.GetSection("validIssuer").Value,
                Audience = jwtSettings.GetSection("validAudience").Value
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
