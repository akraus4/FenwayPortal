using System;
using System.Collections.Generic;
using System.Text;

namespace VSTSComms.VSTS
{
    public class WorkItemRecord
    {
        public int id { get; set; }
        public int rev { get; set; }
        public Field Fields { get; set; }
    }
}
