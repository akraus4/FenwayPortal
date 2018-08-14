using System;
using System.Collections.Generic;

namespace VSTSComms.EntitiesMySQL
{
    public partial class WorkDailyhours
    {
        public string WorkDailyhoursId { get; set; }
        public string WorkTeamMemberId { get; set; }
        public int? Hours { get; set; }

        public WorkTeamMember WorkTeamMember { get; set; }
    }
}
