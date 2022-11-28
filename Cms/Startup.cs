using EPiServer.Cms.Shell;
using EPiServer.Cms.UI.AspNetIdentity;
using EPiServer.ContentApi.Core.Configuration;
using EPiServer.ContentApi.Core.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;



namespace Cms
{
    public class Startup
    {
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
                .ConfigureForExternalTemplates();
                //.Configure<DataAccessOptions>(options => Configuration.GetConnectionString("EPiServerDB"));



            services.AddContentDeliveryApi(options =>
            {
                options.SiteDefinitionApiEnabled = true;
            });

            services.ConfigureForContentDeliveryClient();
      
            services.Configure<ContentApiOptions>(options =>
            {
                options.ForceAbsolute = false;
            });

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

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapContent();
                endpoints.MapNodeJs();
            });
        }
    }
}