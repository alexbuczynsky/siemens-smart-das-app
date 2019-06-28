using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

using BreakerConfigAPI.Services;
using smartDASNamespace;

namespace TodoApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if(SmartDASService.DemoMode == true){
                constants.maxRetries = 0;
            }
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://localhost:36666");
    }
}
