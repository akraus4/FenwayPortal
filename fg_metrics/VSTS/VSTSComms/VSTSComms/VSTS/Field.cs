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
    public class Field
    {
        [JsonProperty(PropertyName = "System.Id")]
        public int id { get; set; }

        [JsonProperty(PropertyName = "System.WorkItemType")]
        public string WorkItemType { get; set; }
        [JsonIgnore]
        public WorkItemTypeEnum WorkItemTypeEnumValue
        {
            get
            {
                switch (WorkItemType.ToLower())
                {
                    case "user story":
                        return WorkItemTypeEnum.UserStory;
                    case "bug":
                        return WorkItemTypeEnum.Bug;
                    case "product backlog item":
                        return WorkItemTypeEnum.PBI;
                    default:
                        return WorkItemTypeEnum.Unknown;
                }
            }
        }
        [JsonProperty(PropertyName = "System.AssignedTo")]
        public string AssignedTo { get; set; }
        [JsonProperty(PropertyName = "System.IterationPath")]
        public string IterationPath { get; set; }
        [JsonProperty(PropertyName = "System.Title")]
        public string Title { get; set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Scheduling.StoryPoints")]
        public double StoryPointValue { get; internal set; }
        [JsonProperty(PropertyName = "Microsoft.VSTS.Scheduling.Effort")]
        public double Effort { get; internal set; }
        [JsonProperty(PropertyName = "System.State")]
        public string State { get; internal set; }

        //[JsonProperty(PropertyName = "System.AreaPath")]
        //public string AreaPath { get; set; }
        //[JsonProperty(PropertyName = "System.TeamProject")]
        //public string TeamProject { get; set; }


        //[JsonProperty(PropertyName = "System.IterationPath")]
        //public string IterationPath { get; set; }


        //[JsonProperty(PropertyName = "System.State")]
        //public string State { get; set; }
        //[JsonProperty(PropertyName = "System.Reason")]
        //public string Reason { get; set; }
        //[JsonProperty(PropertyName = "System.CreatedDate")]
        //public string CreatedDate { get; set; }
        //[JsonProperty(PropertyName = "System.CreatedBy")]
        //public string CreatedBy { get; set; }
        //[JsonProperty(PropertyName = "System.ChangedDate")]
        //public string ChangedDate { get; set; }
        //[JsonProperty(PropertyName = "System.ChangedBy")]
        //public string ChangedBy { get; set; }

    }
}
