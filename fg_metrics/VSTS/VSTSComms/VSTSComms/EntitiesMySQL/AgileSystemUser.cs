using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class AgileSystemUser
    {
        public AgileSystemUser()
        {
            AgileStoryAgileSystemUser = new HashSet<AgileStoryAgileSystemUser>();
        }

        public string AgileSystemUserId { get; set; }
        public string AgileSystemUserName { get; set; }
        public string AgileSystemId { get; set; }
        public string WorkTeamMemberId { get; set; }
        public bool? Active { get; set; }

        public WorkTeamMember WorkTeamMember { get; set; }
        public ICollection<AgileStoryAgileSystemUser> AgileStoryAgileSystemUser { get; set; }
    }
}
