using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Configuration;
using VSTSComms;
using VSTSComms.Utilities;

namespace VSTSComms
{
    class Program
    {
       
        
        static void Main(string[] args)
        {
            var environmentName = VSTSComms.Utilities.Miscellaneous.GetEnvironment();
            bool verboseLogging = VSTSComms.Utilities.Miscellaneous.VerboseLogging();
            var builder = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.json", true, true)
                .AddJsonFile($"appsettings.{environmentName}.json", true, true)
                .AddEnvironmentVariables();
            IConfigurationRoot Configuration = builder.Build();
            Configuration = builder.Build();

            Miscellaneous.RunType runType = Miscellaneous.RunType.Both;
            if (args.Length > 0)
            {
                var input = args[0].ToString().ToLower();
                switch (input)
                {
                    case "extract":
                        runType = Miscellaneous.RunType.Extract;
                        break;
                    case "load":
                        runType = Miscellaneous.RunType.Load;
                        break;
                    default:
                        break;
                }
            }
            Console.WriteLine($"Run type = {runType.ToString()}.");

            var settings = Utilities.Miscellaneous.GetSettingsFile();
            if (verboseLogging == true)
            {
                Utilities.Miscellaneous.WriteOutSettings(runType,settings,Configuration);
            }

            if (runType == Miscellaneous.RunType.Both || runType == Miscellaneous.RunType.Extract)
            {
                Utilities.Miscellaneous.WriteToLog("File extract starting.", true);
                //export vsts
                VSTSExport work = new VSTSExport(Configuration);
                
                work.ProcessTeams();
                Utilities.Miscellaneous.WriteToLog("File extract complete.",true);
            }
            if (runType == Miscellaneous.RunType.Both || runType == Miscellaneous.RunType.Load)
            {
                Utilities.Miscellaneous.WriteToLog("File load to database starting.",true);
                //import json into database
                VSTSComms.Import.Importer importer = new Import.Importer(Configuration);
                importer.Run();
                Utilities.Miscellaneous.WriteToLog("File load to database complete.",true);
            }
            //Console.ReadLine();
        }
    }
}
