using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class WorkTeamMember
    {
        public WorkTeamMember()
        {
            AgileSystemUser = new HashSet<AgileSystemUser>();
            WorkDailyhours = new HashSet<WorkDailyhours>();
        }

        public string WorkTeamMemberId { get; set; }
        public string WorkTeamId { get; set; }
        public string WorkUserId { get; set; }
        public bool? Active { get; set; }

        public WorkTeam WorkTeam { get; set; }
        public WorkUser WorkUser { get; set; }
        public ICollection<AgileSystemUser> AgileSystemUser { get; set; }
        public ICollection<WorkDailyhours> WorkDailyhours { get; set; }
    }
}
