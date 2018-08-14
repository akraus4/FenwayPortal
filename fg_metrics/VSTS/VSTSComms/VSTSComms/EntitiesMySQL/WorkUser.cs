using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class WorkUser
    {
        public WorkUser()
        {
            WorkTeamMember = new HashSet<WorkTeamMember>();
        }

        public string WorkUserId { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public bool? Active { get; set; }

        public ICollection<WorkTeamMember> WorkTeamMember { get; set; }
    }
}
