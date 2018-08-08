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
    //we need create an object so that we can bind the
    //query results and get the query id
    public class QueryResult
    {
        public string id { get; set; }
        public string name { get; set; }
        public string path { get; set; }
        public string url { get; set; }
    }
}
