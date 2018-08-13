using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTSComms
{
    public class AppSetting
    {
        [JsonProperty(PropertyName = "VerboseLogging")]
        private string VerboseLogging { get; set; }

        public bool VerboseLoggingEnabled
        {
            get
            {
                if (!string.IsNullOrEmpty(VerboseLogging) && string.Compare(VerboseLogging, "true", true) == 0)
                    return true;
                else
                    return false;

            }
        }

        [JsonProperty(PropertyName = "environment")]
        public string Environment { get; set; }
        [JsonProperty(PropertyName = "team_fields_to_query")]
        public string FieldsToQuery { get; set; }
        [JsonProperty(PropertyName = "output_directory")]
        public string OutputDirectory { get; set; }
        [JsonProperty(PropertyName = "teams")]
        public List<Team> Teams { get; set; }
        [JsonProperty(PropertyName = "import_directory")]
        public string ImportDirectory { get; set; }

        [JsonProperty(PropertyName = "processed_directory")]
        public string ProcessedDirectory { get; set; }
        [JsonProperty(PropertyName = "errors_directory")]
        public string ErrorsDirectory { get; set; }
        [JsonProperty(PropertyName = "logs_directory")]
        public string LogsDirectory { get; set; }
    }
    public class Team
    {
        [JsonProperty(PropertyName = "team_code")]
        public string Code { get; set; }

        [JsonProperty(PropertyName = "team_tfsurl")]
        public string TFSUrl { get; set; }

        [JsonProperty(PropertyName = "team_project")]
        public string Project { get; set; }

        [JsonProperty(PropertyName = "team_query_path")]
        public string QueryPath { get; set; }

        [JsonProperty(PropertyName = "team_token")]
        public string Token { get; set; }

        [JsonProperty(PropertyName = "api_version")]
        public string APIVersion { get; set; }
        [JsonProperty(PropertyName = "team_collection")]
        public string Collection { get; set; }
        [JsonProperty(PropertyName = "team_id")]
        public string ID { get; set; }

        [JsonProperty(PropertyName = "export_system_type")]
        public string SystemType { get; set; }


    }
}