using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Linq;
using VSTSComms.Ouput;

namespace VSTSComms.VSTS
{
    public class RootObject
    {
        public int count { get; set; }
        [JsonProperty(PropertyName = "value")]
        public List<WorkItemRecord> Records { get; set; }
        public SprintResult SourceSystemSprints { get; set; }
        internal OutPutObject ConvertToOutput(Team team)
        {
            OutPutObject returnValue = new OutPutObject();
            returnValue.TeamID = team.ID;
            returnValue.SystemType = team.SystemType;

            foreach (var record in Records)
            {
                Sprint sprint = returnValue.Sprints.Where(x => x.IterationPath == record.Fields.IterationPath).FirstOrDefault();
                if (sprint == null)
                {
                    var sourceSprint = SourceSystemSprints.SprintItems.Where(x => x.path == record.Fields.IterationPath).FirstOrDefault();
                    sprint = new Sprint();
                    //sprint.LegacyID = sourceSprint.id;
                    sprint.ID = sourceSprint.name;//record.Fields.id.ToString();
                    sprint.Name = sourceSprint.name;
                    sprint.IterationPath = sourceSprint.path;
                    sprint.StartDate = sourceSprint.SprintAttributes.StartDate;
                    sprint.EndDate = sourceSprint.SprintAttributes.EndDate;
                    returnValue.Sprints.Add(sprint);
                }

                //story.SprintName = record.Fields.IterationPath;
                //story.SprintName = record.Fields.Title;

                Story story = new Story();
                sprint.Stories.Add(story);

                //story.AssignedTo = record.Fields.AssignedTo;
                story.ID = record.Fields.id.ToString();
                story.Type = record.Fields.WorkItemTypeEnumValue.ToString();
                story.State = record.Fields.State;
                switch (record.Fields.WorkItemTypeEnumValue)
                {
                    case WorkItemTypeEnum.PBI:
                        story.Points = record.Fields.Effort;
                        break;
                    case WorkItemTypeEnum.Bug:
                    case WorkItemTypeEnum.Unknown:
                    case WorkItemTypeEnum.UserStory:
                    default:
                        story.Points = record.Fields.StoryPointValue;
                        break;
                }
                //assigning all the points to the user at this time.
                story.Assignees.Add(new Assignee() { ID = record.Fields.AssignedTo, Points = story.Points });
            }

            return returnValue;
        }
        //public Field Fields { get; set; }
    }
}
