using BitirmeTezi.Controllers;
using BitirmeTezi.Data;
using BitirmeTezi.Models;
using BitirmeTezi.Repositories;
using BitirmeTezi.WorkerService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Diagnostics;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BitirmeTezi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            //services.AddHostedService<Worker>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddDbContext<DataContext>(x => x.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase")));
            services.AddAutoMapper(typeof(Startup));
            services.AddControllers();
            services.AddScoped<IAuthRepository, AuthRepository>();
            services.AddScoped<IAppRepository, AppRepository>();

            var jwtSettings = Configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings.GetSection("secret").Value);

            services.AddCors(options =>
                 options.AddPolicy("AllowAll", builder =>
                 builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin())
            );

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings.GetSection("validIssuer").Value,
                    ValidAudience = jwtSettings.GetSection("validAudience").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(key)

                };
            });            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            var webSocketOptions = new WebSocketOptions
            {
                KeepAliveInterval = TimeSpan.FromHours(1)
            };


            app.UseWebSockets(webSocketOptions);

            app.Use(async (ctx, nextMsg) =>
            {
                Debug.WriteLine(ctx.Request.Path);
                if (ctx.Request.Path == "/subtitle")
                {
                    if (ctx.WebSockets.IsWebSocketRequest)
                    {
                        var wSocket = await ctx.WebSockets.AcceptWebSocketAsync();
                        await Talk(ctx, wSocket);
                    }
                    else
                    {
                        ctx.Response.StatusCode = 400;
                    }

                }
                else
                {
                    await nextMsg();
                }

            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors("AllowAll");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });            
        }

        private async Task Talk(HttpContext hContext, WebSocket wSocket)
        {
            var bag = new byte[1024];
            WebSocketReceiveResult result = await wSocket.ReceiveAsync(new ArraySegment<byte>(bag), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                var inComingMesage = Encoding.UTF8.GetString(bag, 0, result.Count);                
                Debug.WriteLine("\nClients says that: " + inComingMesage);
                var rnd = new Random();
                var number = rnd.Next(1, 100);
                string message = string.Format("You luck Number is '{0}'. Dont't remember that", number.ToString());

                try
                {
                    var id = int.Parse(inComingMesage);
                    Worker worker = StreamsController.getWorker(int.Parse(inComingMesage));

                    Debug.WriteLine("\nSubtitle: " + Worker.getLastSaidWhat());                    
                    byte[] outGoingMeesage = Encoding.UTF8.GetBytes(Worker.getLastSaidWhat());

                    await wSocket.SendAsync(new ArraySegment<byte>(outGoingMeesage, 0, outGoingMeesage.Length), result.MessageType, result.EndOfMessage, CancellationToken.None);

                    result = await wSocket.ReceiveAsync(new ArraySegment<byte>(bag), CancellationToken.None);
                } catch (Exception e)
                {
                    Debug.WriteLine("exception: " + e.Message);
                }
               

            }
            await wSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

        }
    }
}
