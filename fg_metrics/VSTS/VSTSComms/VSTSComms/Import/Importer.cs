using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Linq;
using VSTSComms.Ouput;
using Microsoft.Extensions.Configuration;
using VSTSComms.EntitiesMySQL;

namespace VSTSComms.Import
{
    public class Importer
    {
        private IConfigurationRoot configuration;
        private bool _verboseLogging = false;
        public Importer(IConfigurationRoot configuration)
        {
            this.configuration = configuration;
        }

        public Importer() { }

        fg_metricsContext _dataContext;
        AppSetting _appSetting;
        public void Run()
        {
            InitializeSettings();
            string[] filePaths = Directory.GetFiles(_appSetting.ImportDirectory, "*.json", SearchOption.TopDirectoryOnly);
            //set the connstring here.
            _dataContext = new fg_metricsContext(configuration.GetConnectionString("DefaultConnection"));

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
            _verboseLogging = Utilities.Miscellaneous.VerboseLogging();

            try
            {
                if(_verboseLogging)
                    Utilities.Miscellaneous.WriteToLog($"Begin Processing file:{file}.", true);
                string content = System.IO.File.ReadAllText(file);
                VSTSComms.Ouput.OutPutObject jsonContent = JsonConvert.DeserializeObject<VSTSComms.Ouput.OutPutObject>(content);

                WorkTeam workTeam = _dataContext.WorkTeam.Where(x => x.WorkTeamId == jsonContent.TeamID).FirstOrDefault();

                AgileSystem agileSystem = _dataContext.AgileSystem.Where(x => x.WorkTeamId == jsonContent.TeamID).FirstOrDefault();
                if (agileSystem == null)
                {
                    if(_verboseLogging)
                        Utilities.Miscellaneous.WriteToLog($"Adding agile system for : ID = {workTeam.WorkTeamId}, Team = {workTeam.WorkTeamName}, System = {jsonContent.SystemType}.", true);

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

                foreach (var sprint in jsonContent.Sprints)
                {
                    //TODO: fix issue here with finding previous sprint.  It's not deleting it.
                    //find sprint 
                    //AgileSprint agileSprint = FindSprint(workTeam.TeamId, sprint.ID);
                    AgileSprint agileSprint = FindSprint(agileSystem.AgileSystemId, sprint.ID);
                    if (agileSprint != null)
                    {
                        RemoveStories(agileSprint);
                    }
                    if (agileSprint == null)
                    {
                        agileSprint = new AgileSprint();
                        _dataContext.AgileSprint.Add(agileSprint);
                        agileSprint.AgileSprintId = Guid.NewGuid().ToString();
                    }
                    if (_verboseLogging)
                        Utilities.Miscellaneous.WriteToLog($"Adding sprint: ID = {sprint.ID}, SprintName = {sprint.Name}.", true);
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
                        if (_verboseLogging)
                            Utilities.Miscellaneous.WriteToLog($"Adding story: ID = {story.ID}, StoryPoints = {story.Points}.", true);
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
                            if (_verboseLogging)
                                Utilities.Miscellaneous.WriteToLog($"AgileSystemUserId = {assignee.ID}, StoryPoints = {story.Points}, Story ID {story.ID}.", true);
                        }
                    }
                }
                Utilities.Miscellaneous.WriteToLog($"Complete Processing file:{file}.", true);
            }
            catch (Exception ex1)
            {
                Utilities.Miscellaneous.WriteToLog($"See the log file.  Error Processing file: {file}.", true);
                ex = ex1;
            }
            return ex;
        }

        private void MarkFileAsProcessed(string file, Exception ex)
        {
            if(_verboseLogging)
                Utilities.Miscellaneous.WriteToLog($"Marking file as processed :{file}.", true);
            string fileName = Path.GetFileName(file);
            if (ex == null)
            {
                //worked fine move to processed
                File.Move(file, $@"{_appSetting.ProcessedDirectory}/{fileName}");
                WriteToLog($"File {fileName} was processed successsfully.");
            }
            else
            {
                StringBuilder sbErrorMessage = new StringBuilder();
                sbErrorMessage.AppendLine($"Error processing file {fileName}");
                sbErrorMessage.Append(ex.ToString());
                WriteToLog(sbErrorMessage.ToString());

                //errors move to errors folder
                File.Move(file, $@"{_appSetting.ErrorsDirectory}/{fileName}");
            }
            if (_verboseLogging)
                Utilities.Miscellaneous.WriteToLog($"File marked as processed :{file}.", true);
        }

        private void WriteToLog(string message)
        {
            message = $"{DateTime.Now.ToString()}|{message}";
            string fileNameAndPath = $@"{_appSetting.LogsDirectory}/{DateTime.Now.Date.ToString("yyyyMMdd")}.txt";
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
            if(_verboseLogging)
                Utilities.Miscellaneous.WriteToLog($"Sprint ID to remove:{agileSprint.AgileSprintId }");

            List<AgileStory> storiesToRemove = _dataContext.AgileStory.Where(x => x.AgileSprintId == agileSprint.AgileSprintId).ToList();

            foreach (var story in storiesToRemove)
            {
                //remove users of the stories
                List<AgileStoryAgileSystemUser> usersToRemove = _dataContext.AgileStoryAgileSystemUser.Where(x => x.AgileStoryId == story.AgileStoryId).ToList();
                if (usersToRemove != null && usersToRemove.Any())
                {
                    if(_verboseLogging)
                        Utilities.Miscellaneous.WriteToLog($"Users to Remove:{usersToRemove.First().AgileStoryAgileSystemUserId.ToString()}");
                    _dataContext.AgileStoryAgileSystemUser.RemoveRange(usersToRemove);
                }

                //TODO: add this back after foreign keys are readded.
                //agileSprint.AgileStory.Remove(story);
                _dataContext.AgileStory.Remove(story);
                if(_verboseLogging)
                    Utilities.Miscellaneous.WriteToLog($"Story ID to remove:{story.AgileStoryId }");
            }

            
        }

        private AgileSprint FindSprint(string agileSystemID, string sprintID)
        {
            AgileSprint agileSprint = _dataContext.AgileSprint.Where(x => x.AgileSprintName == sprintID && x.AgileSystemId == agileSystemID).FirstOrDefault();
            return agileSprint;
        }

        private void InitializeSettings()
        {
            _appSetting = VSTSComms.Utilities.Miscellaneous.GetSettingsFile();
        }
    }
}

