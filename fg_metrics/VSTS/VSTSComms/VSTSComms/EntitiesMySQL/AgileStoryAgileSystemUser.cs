using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class AgileStoryAgileSystemUser
    {
        public string AgileStoryAgileSystemUserId { get; set; }
        public string AgileStoryId { get; set; }
        public string AgileSystemUserId { get; set; }
        public string AgileSystemUserStoryPoints { get; set; }

        public AgileStory AgileStory { get; set; }
        public AgileSystemUser AgileSystemUser { get; set; }
    }
}
