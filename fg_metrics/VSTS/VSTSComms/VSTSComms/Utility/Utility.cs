using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace VSTSComms.Utilities
{
    public static class Miscellaneous
    {
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
    }

    
}
