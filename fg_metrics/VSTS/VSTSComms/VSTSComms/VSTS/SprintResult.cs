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
    public class SprintResult
    {
        public int count { get; set; }
        [JsonProperty(PropertyName = "value")]
        //List<SprintItem> SprintItems { get; set; }
        public SprintItem[] SprintItems { get; set; }
    }
}
