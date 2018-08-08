using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Linq;

namespace VSTSComms.VSTS
{
    public class SprintAttribute
    {
        [JsonProperty(PropertyName = "startDate")]
        public string StartDate { get; set; }
        [JsonProperty(PropertyName = "finishDate")]
        public string EndDate { get; set; }
        [JsonProperty(PropertyName = "timeFrame")]
        public string timeFrame { get; set; }
    }
}
