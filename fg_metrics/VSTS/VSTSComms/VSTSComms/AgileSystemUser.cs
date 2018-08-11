using System;
using System.Collections.Generic;

namespace VSTSComms
{
    public partial class AgileSystemUser
    {
        public string AgileSystemUserId { get; set; }
        public string AgileSystemUserName { get; set; }
        public string AgileSystemId { get; set; }
        public string WorkTeamMemberId { get; set; }
        //public string WorkUserId { get; set; }
        public bool Active { get; set; }
    }
}
