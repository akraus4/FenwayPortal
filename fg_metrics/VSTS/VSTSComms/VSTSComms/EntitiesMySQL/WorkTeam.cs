using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class WorkTeam
    {
        public WorkTeam()
        {
            AgileSystem = new HashSet<AgileSystem>();
            WorkTeamMember = new HashSet<WorkTeamMember>();
        }

        public string WorkTeamId { get; set; }
        public string WorkTeamName { get; set; }
        public string ProjectId { get; set; }
        public string ProjectName { get; set; }
        public bool? Active { get; set; }

        public ICollection<AgileSystem> AgileSystem { get; set; }
        public ICollection<WorkTeamMember> WorkTeamMember { get; set; }
    }
}
