using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace VSTSComms.Utilities
{
    public static class Miscellaneous
    {
        public enum RunType
        {
            Extract,
            Load,
            Both
        }

        internal static bool VerboseLogging()
        {
            string file = $@"{AppDomain.CurrentDomain.BaseDirectory}appSettings.json";
            string fileContents = Utilities.Miscellaneous.GetFileContents(file);
            var appSetting = JsonConvert.DeserializeObject<AppSetting>(fileContents);
            return appSetting.VerboseLoggingEnabled;
        }

        enum LogType
        {

        }
        public static void WriteToLog(string message, bool showOnConsole = false)
        {
            var appsettings = GetSettingsFile();
            message = $"{DateTime.Now.ToString()}|{message}";
            string fileNameAndPath = $@"{appsettings.LogsDirectory}/{DateTime.Now.Date.ToString("yyyyMMdd")}.txt";
            File.AppendAllLines(fileNameAndPath, new[] { message });
            if(showOnConsole)
                Console.WriteLine(message);
        }

        public static string GetFileContents(string fileName)
        {
            // This text is added only once to the file.
            if (File.Exists(fileName))
            {
                return File.ReadAllText(fileName);
            }
            else
                return string.Empty;
        }
        public static AppSetting GetSettingsFile()
        {
            string environment = GetEnvironment();
            string file = $@"{AppDomain.CurrentDomain.BaseDirectory}appsettings.{environment}.JSON";
            string fileContents = GetFileContents(file);
            return JsonConvert.DeserializeObject<AppSetting>(fileContents);
        }
        public static string GetEnvironment()
        {
            string file = $@"{AppDomain.CurrentDomain.BaseDirectory}appSettings.json";
            string fileContents = Utilities.Miscellaneous.GetFileContents(file);
            var appSetting = JsonConvert.DeserializeObject<AppSetting>(fileContents);
            return appSetting.Environment;
        }

        internal static void WriteOutSettings(RunType runType, AppSetting settings, IConfigurationRoot configuration)
        {
            WriteToLog($"RunType:{runType.ToString()}", true);
            WriteToLog($"Environment:{ settings.Environment}", true);
            WriteToLog("Settings and Configuration:", true);
            WriteToLog($"Database Connection String: {configuration.GetConnectionString("DefaultConnection")}.",true);
            WriteToLog($"Errors Directory:{ settings.ErrorsDirectory}.",true);
            WriteToLog($"Import Directory:{ settings.ImportDirectory}.", true);
            WriteToLog($"Logs Directory:{ settings.LogsDirectory}.", true);
            WriteToLog($"Ouput Directory:{ settings.OutputDirectory}.", true);
            WriteToLog($"Processed Directory:{ settings.ProcessedDirectory}.", true);
            
        }

    }

    
}
