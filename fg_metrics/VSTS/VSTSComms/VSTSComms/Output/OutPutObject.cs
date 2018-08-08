using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace VSTSComms.Ouput
{
    public class OutPutObject
    {
        [JsonProperty(PropertyName = "team_id")]
        public string TeamID { get; set; }

        [JsonProperty(PropertyName = "system_type")]
        public string SystemType { get; set; }

        private List<Sprint> _sprints;
        [JsonProperty(PropertyName = "sprint")]
        public List<Sprint> Sprints
        {
            get
            {
                if (_sprints == null)
                    _sprints = new List<Sprint>();
                return _sprints;
            }
            set { _sprints = value; }
        }
    }
    public class Sprint
    {
        [JsonProperty(PropertyName = "sprint_id")]
        public string ID { get; set; }
        [JsonProperty(PropertyName = "sprint_name")]
        public string Name { get; set; }
        
        private string _startDate;
        [JsonProperty(PropertyName = "sprint_start_date")]
        public string StartDate
        {
            get { return _startDate; }
            set{ _startDate = CustomTrim(value, 'T');}
        }

        private string CustomTrim(string input, char v)
        {
            int index = input.IndexOf("T");
            if (index > 0)
            {
                return input.Substring(0, index);
            }
            else
                return input;
        }

        
        private string _endDate;
        [JsonProperty(PropertyName = "sprint_end_date")]
        public string EndDate
        {
            get { return _endDate; }
            set { _endDate = CustomTrim(value, 'T'); }
        }

        private List<Story> _stories;
        [JsonProperty(PropertyName = "stories")]
        public List<Story> Stories
        {
            get
            {
                if (_stories == null)
                    _stories = new List<Story>();
                return _stories;
            }
            set { _stories = value; }
        }
        [JsonIgnoreAttribute]
        //public string LegacyID { get; internal set; }
        public string IterationPath { get; internal set; }
    }
    public class Assignee
    {
        [JsonProperty(PropertyName = "user")]
        public string ID { get; set; }
        [JsonProperty(PropertyName = "user_points")]
        public double Points { get; set; }
    }
    public class Story
    {
        [JsonProperty(PropertyName = "story_id")]
        public string ID { get; set; }
        [JsonProperty(PropertyName = "story_points")]
        public double Points { get; set; }
        //[JsonProperty(PropertyName = "story_name")]
        //public string Name { get; set; }

        private List<Assignee> _assignees;
        [JsonProperty(PropertyName = "assigned_to")]
        public List<Assignee> Assignees
        {
            get
            {
                if (_assignees == null)
                    _assignees = new List<Assignee>();
                return _assignees;
            }
        }
        [JsonProperty(PropertyName = "story_state")]
        public string State { get; set; }
        [JsonProperty(PropertyName = "story_type")]
        public string Type { get; internal set; }
        //[JsonProperty(PropertyName = "assigned_to")]
        //public List<Assignee> Assignees { get; set; }
    }
    
}
