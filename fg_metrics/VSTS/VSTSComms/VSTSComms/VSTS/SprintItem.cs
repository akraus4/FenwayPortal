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
    public class SprintItem
    {
        public string id { get; set; }
        public string name { get; set; }
        public string path { get; set; }

        //[JsonProperty(PropertyName = "attributes")]
        //SprintAttribute[] SprintAttibutes { get; set; }
        [JsonProperty(PropertyName = "attributes")]
        public SprintAttribute SprintAttributes { get; set; }
    }
}
