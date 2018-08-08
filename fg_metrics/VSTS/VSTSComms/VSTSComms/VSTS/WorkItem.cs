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
    public class Workitem
    {
        public int id { get; set; }
        public string url { get; set; }
    }
}
