using Episerver.ContentDelivery.NodeProxy.DependencyInjection;
using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.Core.DependencyInjection;
using EPiServer.Core;
using EPiServer.Data;
using EPiServer.Web;
using EPiServer.Web.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.IO;

namespace Cms
{
    public class Startup
    {
        private readonly string _policyName = "CorsPolicy";
        private readonly IWebHostEnvironment _webHostingEnvironment;

        public Startup(IConfiguration configuration, IWebHostEnvironment webHostingEnvironment)
        {
            Configuration = configuration;
            _webHostingEnvironment = webHostingEnvironment;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            AppDomain.CurrentDomain.SetData("DataDirectory", Path.Combine(_webHostingEnvironment.ContentRootPath, "App_Data"));

            

            services
                .AddCmsAspNetIdentity<ApplicationUser>()
                .AddCms()
                .AddAdminUserRegistration()
                .AddEmbeddedLocalization<Program>()
                .ConfigureForExternalTemplates()
                //.Configure<DataAccessOptions>(options => Configuration.GetConnectionString("EPiServerDB"))
                .Configure<ExternalApplicationOptions>(o => o.OptimizeForDelivery = true);


            services.AddContentDefinitionsApi();
            services.AddContentDeliveryApi().WithFriendlyUrl().WithSiteBasedCors();

            services.AddNodeJs(options =>
            {
                if (_webHostingEnvironment.IsDevelopment())
                {
                    options.LaunchCommand = "npm run dev";
                    options.WorkingDirectory = "../Frontend/next/";
                    options.RedirectOutput = false;
                }
                else
                {
                    var port = 4000;

                    options.DestinationPort = port;
                    options.LaunchCommand = "node ./server/index.mjs";
                    // If server contains secrets, these files needs to be served from elsewhere.
                    // We can leverage the static file middleware by serving them from here.
                    options.WorkingDirectory = "./wwwroot/";
                    options.EnvironmentVariables = new Dictionary<string, string>
                {
                    { "PORT", port.ToString() },
                    { "NUXT_PUBLIC_API_URL", "http://localhost:80/api/episerver/v3.0/" },
                    { "NUXT_PUBLIC_WEBSITE_URL", "http://www.example.com/" }
                };
                }
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy(name: _policyName, builder =>
                {
                    builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });

            //services.TryAddEnumerable(ServiceDescriptor.Singleton(typeof(IFirstRequestInitializer), typeof(UsersInstaller)));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = ctx => {
                    ctx.Context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
                    ctx.Context.Response.Headers.Append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
                    ctx.Context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                },
            });

            app.UseRouting();

            app.UseCors(builder => builder
                     .AllowAnyOrigin()
                     .AllowAnyMethod()
                     .AllowAnyHeader());

            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "Default", pattern: "{controller}/{action}/{id?}");
                endpoints.MapControllers();
                endpoints.MapContent();
                endpoints.MapNodeJs();

            });
        }
    }
}