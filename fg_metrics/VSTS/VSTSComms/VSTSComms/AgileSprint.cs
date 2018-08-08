using System;
using System.Collections.Generic;

namespace VSTSComms
{
    public partial class AgileSprint
    {
        public string AgileSprintId { get; set; }
        public string AgileSprintName { get; set; }
        public string AgileSystemId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string SprintDescription { get; set; }
    }
}
