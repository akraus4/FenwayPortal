using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using VSTSComms.Ouput;

namespace VSTSComms.Import
{
    public class Importer
    {
        public Importer()
        {

        }
        fg_metricsContext _dataContext;
        AppSetting _appSetting;
        public void Run()
        {
            InitializeSettings();
            string[] filePaths = Directory.GetFiles(_appSetting.ImportDirectory, "*.json", SearchOption.TopDirectoryOnly);
            _dataContext = new fg_metricsContext();

            foreach (var file in filePaths)
            {
                Exception ex = null;
                ex = ProcessFile(file);
                if(ex == null)
                    _dataContext.SaveChanges();
                MarkFileAsProcessed(file, ex);
            }

        } 
        private Exception ProcessFile(string file)
        {
            Exception ex = null;
            try
            {
                string content = System.IO.File.ReadAllText(file);
                VSTSComms.Ouput.OutPutObject jsonContent = JsonConvert.DeserializeObject<VSTSComms.Ouput.OutPutObject>(content);

                WorkTeam workTeam = _dataContext.WorkTeam.Where(x => x.WorkTeamId == jsonContent.TeamID).FirstOrDefault();

                AgileSystem agileSystem = _dataContext.AgileSystem.Where(x => x.WorkTeamId == jsonContent.TeamID).FirstOrDefault();
                if (agileSystem == null)
                {

                    agileSystem = new AgileSystem()
                    {
                        AgileSystemId = Guid.NewGuid().ToString(),
                        AgileSystemType = jsonContent.SystemType,
                        AgileSystemName = workTeam.WorkTeamName,
                        WorkTeamId = workTeam.WorkTeamId
                    };
                    _dataContext.AgileSystem.Add(agileSystem);
                }


                AddAnyMissingUsers(agileSystem, jsonContent);


                //WorkTeam workTeam = _dataContext.WorkTeam.Where(x => x.TeamId == jsonContent.TeamID).FirstOrDefault();

                foreach (var sprint in jsonContent.Sprints)
                {
                    //TODO: fix issue here with finding previous sprint.  It's not deleting it.
                    //find sprint 
                    //AgileSprint agileSprint = FindSprint(workTeam.TeamId, sprint.ID);
                    AgileSprint agileSprint = FindSprint(agileSystem.AgileSystemId, sprint.ID);
                    if (agileSprint != null) { RemoveStories(agileSprint); }
                    if (agileSprint == null)
                    {
                        agileSprint = new AgileSprint();
                        _dataContext.AgileSprint.Add(agileSprint);
                        agileSprint.AgileSprintId = Guid.NewGuid().ToString();
                    }
                    //set properties
                    agileSprint.AgileSprintName = sprint.ID;
                    agileSprint.AgileSystemId = agileSystem.AgileSystemId;
                    agileSprint.SprintDescription = sprint.Name;
                    agileSprint.EndDate = Convert.ToDateTime(sprint.EndDate);
                    agileSprint.StartDate = Convert.ToDateTime(sprint.StartDate);

                    foreach (var story in sprint.Stories)
                    {
                        AgileStory agileStory = new AgileStory() { AgileStoryId = Guid.NewGuid().ToString() };
                        _dataContext.AgileStory.Add(agileStory);
                        agileStory.AgileStoryName = story.ID;
                        agileStory.AgileSprintId = agileSprint.AgileSprintId;
                        agileStory.StoryDescription = story.ID;
                        agileStory.StoryType = story.Type;
                        agileStory.StoryStatus = story.State;
                        agileStory.StoryPoints = Convert.ToString(story.Points);


                        foreach (var assignee in story.Assignees)
                        {
                            if (assignee.ID != null)
                            {
                                AgileStoryAgileSystemUser agileStoryAgileSystemUser = new AgileStoryAgileSystemUser();
                                _dataContext.AgileStoryAgileSystemUser.Add(agileStoryAgileSystemUser);
                                agileStoryAgileSystemUser.AgileStoryAgileSystemUserId = Guid.NewGuid().ToString();
                                agileStoryAgileSystemUser.AgileStoryId = agileStory.AgileStoryId;
                                //TODO get team member
                                AgileSystemUser systemUser = FindAgileSystemUser(assignee, agileSystem.AgileSystemId);
                                agileStoryAgileSystemUser.AgileSystemUserId = systemUser.AgileSystemUserId;
                                agileStoryAgileSystemUser.AgileSystemUserStoryPoints = assignee.Points.ToString();
                            }
                        }
                    }
                }
            }
            catch (Exception ex1)
            {
                ex = ex1;
            }
            return ex;
        }

        private void MarkFileAsProcessed(string file, Exception ex)
        {
            string fileName = Path.GetFileName(file);
            if (ex == null)
            {
                //worked fine move to processed
                File.Move(file, $@"{_appSetting.ProcessedDirectory}\{fileName}");
                WriteToLog($"File {fileName} was processed successsfully.");
            }
            else
            {
                StringBuilder sbErrorMessage = new StringBuilder();
                sbErrorMessage.AppendLine($"Error processing file {fileName}");
                sbErrorMessage.Append(ex.ToString());
                WriteToLog(sbErrorMessage.ToString());

                //errors move to errors folder
                File.Move(file, $@"{_appSetting.ErrorsDirectory}\{fileName}");
            }
        }

        private void WriteToLog(string message)
        {
            message = $"{DateTime.Now.ToString()}|{message}";
            string fileNameAndPath = $@"{_appSetting.LogsDirectory}\{DateTime.Now.Date.ToString("yyyyMMdd")}.txt";
            File.AppendAllLines(fileNameAndPath, new[] { message });
        }

        private AgileSystemUser FindAgileSystemUser(Assignee assignee, string systemId)
        {

            AgileSystemUser agileSystemUser = _dataContext.AgileSystemUser.Where(x => x.AgileSystemId == systemId && x.AgileSystemUserName == assignee.ID).FirstOrDefault();
            if (agileSystemUser == null)
            {
                agileSystemUser = new AgileSystemUser() { AgileSystemId = systemId, AgileSystemUserId = assignee.ID, Active = true };
                _dataContext.AgileSystemUser.Add(agileSystemUser);
            }
            return agileSystemUser;
        }

        private void AddAnyMissingUsers(AgileSystem agileSystem, OutPutObject jsonContent)
        {
            List<string> userList = FlattenUsers(jsonContent);
            foreach (var user in userList)
            {
                AgileSystemUser asu = _dataContext.AgileSystemUser.Where(x => x.AgileSystemUserName == user && agileSystem.AgileSystemId == x.AgileSystemId).FirstOrDefault();
                if (asu == null)
                {
                    //set em up, they weren't found
                    asu = new AgileSystemUser()
                    {
                        AgileSystemUserId = Guid.NewGuid().ToString(),
                        AgileSystemUserName = user,
                        AgileSystemId = agileSystem.AgileSystemId,
                        Active = true
                        //work values populated upon cross reference (manual)
                    };
                    _dataContext.AgileSystemUser.Add(asu);
                }

            }

            _dataContext.SaveChanges();
        }

        private List<string> FlattenUsers(OutPutObject jsonContent)
        {
            List<string> list = new List<string>();
            var users = (
                            from sprint in jsonContent.Sprints
                            from story in sprint.Stories
                            from assignees in story.Assignees
                            select assignees
                        ).Distinct();
            foreach (var user in users)
            {
                if (!list.Contains(user.ID) && !string.IsNullOrEmpty(user.ID))
                    list.Add(user.ID);
            }
            return list;
        }

        //private WorkTeamMember FindWorkTeamMember(Assignee assignee)
        //{
        //    assignee.id;
        //}

        private void RemoveStories(AgileSprint agileSprint)
        {
            List<AgileStory> storiesToRemove = _dataContext.AgileStory.Where(x => x.AgileSprintId == agileSprint.AgileSprintId).ToList();

            foreach (var story in storiesToRemove)
            {
                //TODO: add this back after foreign keys are readded.
                //agileSprint.AgileStory.Remove(story);
                _dataContext.AgileStory.Remove(story);

            }
        }

        private AgileSprint FindSprint(string agileSystemID, string sprintID)
        {
            AgileSprint agileSprint = _dataContext.AgileSprint.Where(x => x.AgileSprintName == sprintID && x.AgileSystemId == agileSystemID).FirstOrDefault();
            return agileSprint;
        }

        private void InitializeSettings()
        {
            string file = $@"{AppDomain.CurrentDomain.BaseDirectory}appSettings.JSON";

            string fileContents = Utilities.Miscellaneous.GetFileContents(file);
            _appSetting = JsonConvert.DeserializeObject<AppSetting>(fileContents);
        }
    }
}

