using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class AgileSprint
    {
        public AgileSprint()
        {
            AgileStory = new HashSet<AgileStory>();
        }

        public string AgileSprintId { get; set; }
        public string AgileSprintName { get; set; }
        public string AgileSystemId { get; set; }
        public string SprintDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public AgileSystem AgileSystem { get; set; }
        public ICollection<AgileStory> AgileStory { get; set; }
    }
}
