using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Formatting.Compact;
using System;

namespace Cms
{
    public class Program
    {

        public static void Main(string[] args)
        {
            //Log.Logger = new LoggerConfiguration()
               // .ReadFrom.Configuration(Configuration).WriteTo.Console().CreateLogger();

            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>

            Host.CreateDefaultBuilder(args)
                .ConfigureCmsDefaults()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}