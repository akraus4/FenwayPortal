using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class AgileSystem
    {
        public AgileSystem()
        {
            AgileSprint = new HashSet<AgileSprint>();
        }

        public string AgileSystemId { get; set; }
        public string AgileSystemName { get; set; }
        public string AgileSystemType { get; set; }
        public string WorkTeamId { get; set; }
        public bool? Active { get; set; }

        public WorkTeam WorkTeam { get; set; }
        public ICollection<AgileSprint> AgileSprint { get; set; }
    }
}
