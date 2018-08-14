using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class AgileStory
    {
        public AgileStory()
        {
            AgileStoryAgileSystemUser = new HashSet<AgileStoryAgileSystemUser>();
        }

        public string AgileStoryId { get; set; }
        public string AgileStoryName { get; set; }
        public string AgileSprintId { get; set; }
        public string StoryDescription { get; set; }
        public string StoryType { get; set; }
        public string StoryStatus { get; set; }
        public string StoryPoints { get; set; }

        public AgileSprint AgileSprint { get; set; }
        public ICollection<AgileStoryAgileSystemUser> AgileStoryAgileSystemUser { get; set; }
    }
}
