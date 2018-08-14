using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Linq;
using VSTSComms.VSTS;
using VSTSComms.Ouput;
using Microsoft.Extensions.Configuration;

namespace VSTSComms
{     
    public class VSTSExport
    {
        private IConfigurationRoot configuration;

        public VSTSExport(IConfigurationRoot configuration)
        {
            this.configuration = configuration;
        }
       

        public void ProcessTeams()
        {
            try
            {
                AppSetting settings = VSTSComms.Utilities.Miscellaneous.GetSettingsFile();

                foreach (var team in settings.Teams)
                {
                    Utilities.Miscellaneous.WriteToLog($"Exporting team {team.Code}.", true);

                    string _credentials = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", team.Token)));
                    string siteUrl = $@"https://{team.TFSUrl}";
                    using (var client = new HttpClient())
                    {
                        client.BaseAddress = new Uri(siteUrl);
                        client.DefaultRequestHeaders.Accept.Clear();
                        client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _credentials);

                        //GetWorkItemsByWiql(client, team);
                        SprintResult sprintsFromSourceSystem = GetSprintsFromTeam(client, team);

                        HttpResponseMessage queryHttpResponseMessage = RunQueries(client, team);


                        if (queryHttpResponseMessage.IsSuccessStatusCode)
                        {
                            //bind the response content to the queryResult object
                            QueryResult queryResult = queryHttpResponseMessage.Content.ReadAsAsync<QueryResult>().Result;
                            string queryId = queryResult.id;

                            HttpResponseMessage httpResponseMessage = RunIDQuery(client, team, queryId);
                            if (httpResponseMessage.IsSuccessStatusCode)
                            {
                                WorkItemQueryResult workItemQueryResult = httpResponseMessage.Content.ReadAsAsync<WorkItemQueryResult>().Result;

                                //now that we have a bunch of work items, build a list of id's so we can get details
                                var builder = new System.Text.StringBuilder();
                                foreach (var item in workItemQueryResult.workItems)
                                {
                                    builder.Append(item.id.ToString()).Append(",");
                                }

                                //clean up string of id's
                                string ids = builder.ToString().TrimEnd(new char[] { ',' });
                                //string[] idToQuery = ids.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

                                HttpResponseMessage getWorkItemsHttpResponse = RunWorkItemsQuery(client, team, ids, settings);

                                if (getWorkItemsHttpResponse.IsSuccessStatusCode)
                                {
                                    var result = getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result;
                                    RootObject ro = JsonConvert.DeserializeObject<RootObject>(result);
                                    ro.SourceSystemSprints = sprintsFromSourceSystem;
                                    OutPutObject output = ro.ConvertToOutput(team);
                                    string fileContent = JsonConvert.SerializeObject(output);
                                    WriteFile(team.Code, settings.OutputDirectory, fileContent);
                                }
                                else
                                {
                                    Utilities.Miscellaneous.WriteToLog($"The request for RunWorkItemsQuery failed.  Reason:{getWorkItemsHttpResponse.RequestMessage}.", true);
                                }
                            }
                            else
                            {
                                Utilities.Miscellaneous.WriteToLog($"The request for RunIDQuery failed.  Reason:{httpResponseMessage.RequestMessage}.", true);
                            }
                        }
                        else
                        {
                            Utilities.Miscellaneous.WriteToLog($"The request for RunQueries failed.  Reason:{queryHttpResponseMessage.RequestMessage}.", true);
                        }
                    }
                }
            }catch(Exception mainEx)
            {
                Utilities.Miscellaneous.WriteToLog($"Error Processing teams.  Reason:{mainEx.ToString()}.", true);
            }
        }

        private HttpResponseMessage RunWorkItemsQuery(HttpClient client, Team team, string ids, AppSetting settings)
        {
            
            //string query = $"{siteUrl}/DefaultCollection/_apis/wit/workitems?ids={ids}&fields={settings.FieldsToQuery}&api-version=2.2";
            string query = $"{GetPath(team)}/_apis/wit/workitems?ids={ids}&fields={settings.FieldsToQuery}&api-version={team.APIVersion}";

            HttpResponseMessage getWorkItemsHttpResponse = client.GetAsync(query).Result;
            return getWorkItemsHttpResponse;
        }

        private HttpResponseMessage RunIDQuery(HttpClient client, Team team, string queryId)
        {
            //using the queryId in the url, we can execute the query
            string queryIDQuery = $"{GetPath(team)}/_apis/wit/wiql/" + queryId + $"?api-version={team.APIVersion}";
            HttpResponseMessage httpResponseMessage = client.GetAsync(queryIDQuery).Result;

            //original and works
            //HttpResponseMessage httpResponseMessage = client.GetAsync(team.Project + "/_apis/wit/wiql/" + queryId + $"?api-version={team.APIVersion}").Result;
            return httpResponseMessage;
        }

        private HttpResponseMessage RunQueries(HttpClient client, Team team)
        {
            //if you already know the query id, then you can skip this step
            string queriesQuery = $"{GetPath(team)}/_apis/wit/queries/{team.QueryPath}?api-version={team.APIVersion}";
            return client.GetAsync(queriesQuery).Result;

            //original and works
            //HttpResponseMessage queryHttpResponseMessage = client.GetAsync(team.Project + "/_apis/wit/queries/" + team.QueryPath + $"?api-version={team.APIVersion}").Result;

        }

        private SprintResult GetSprintsFromTeam(HttpClient client, Team team)
        {
            SprintResult sprintResult = null;
            try
            {
                string query = $"{GetPath(team)}/_apis/work/teamsettings/iterations?api-version={team.APIVersion}";
                
                HttpResponseMessage queryHttpResponseMessage = client.GetAsync(query).Result;

                if (queryHttpResponseMessage.IsSuccessStatusCode)
                {
                    //bind the response content to the queryResult object
                    sprintResult = queryHttpResponseMessage.Content.ReadAsAsync<SprintResult>().Result;

                    //string queryId = queryResult.id;
                }
                else
                {
                    sprintResult = new SprintResult();
                }
                    return sprintResult;
                }
            catch (Exception)
            {
                sprintResult = new SprintResult();
                
            }
            return sprintResult;
        }

        private string GetPath(Team team)
        {
            return $"https://{team.TFSUrl}/{team.Collection}/{team.Project}";
        }

       

        private void WriteFile(string teamCode, string fileNameAndPath, string fileContent)
        {
            //string sprint = "";
            string dateString = DateTime.Now.ToString("yyyyMMdd_hhmm");
            string path = $@"{fileNameAndPath}\{dateString}_{teamCode}.json";
            if (!File.Exists(path))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(path))
                {
                    sw.Write(fileContent);
                }
            }
        }


        private void GetWorkItemsByWiql(HttpClient client, Team team)
        {
            //string _personalAccessToken = "your personal access token";
            //string _credentials = Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(string.Format("{0}:{1}", "", _personalAccessToken)));

            ////this is needed because we want to create a project scoped query
            //string project = "fabrikam";

            //create wiql object
            var wiql = new
            {
                query = "Select [State], [Title] [AssignedTo]" +
                        "From WorkItems " +
                        "Where [Work Item Type] = 'Bug' " +
                        "And [System.TeamProject] = '" + team.Project + "' " +
                        "And [System.State] = 'New' " +
                        "Order By [State] Asc, [Changed Date] Desc"
            };

            //using (var client = new HttpClient())
            //{
                //client.BaseAddress = new Uri("https://account.visualstudio.com");
                //client.DefaultRequestHeaders.Accept.Clear();
                //client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", _credentials);

                //serialize the wiql object into a json string   
                var postValue = new StringContent(JsonConvert.SerializeObject(wiql), Encoding.UTF8, "application/json"); //mediaType needs to be application/json for a post call

                var method = new HttpMethod("POST");
            string query = $"{GetPath(team)}/_apis/wit/wiql?api-version=2.2";
                var httpRequestMessage = new HttpRequestMessage(method, query) { Content = postValue };
                var httpResponseMessage = client.SendAsync(httpRequestMessage).Result;

                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    WorkItemQueryResult workItemQueryResult = httpResponseMessage.Content.ReadAsAsync<WorkItemQueryResult>().Result;

                    //now that we have a bunch of work items, build a list of id's so we can get details
                    var builder = new System.Text.StringBuilder();
                    foreach (var item in workItemQueryResult.workItems)
                    {
                        builder.Append(item.id.ToString()).Append(",");
                    }

                    //clean up string of id's
                    string ids = builder.ToString().TrimEnd(new char[] { ',' });

                string workItemQuery = "_apis/wit/workitems?ids=" + ids + "&fields=System.Id,System.Title,System.State&asOf=" + workItemQueryResult.asOf + "&api-version=2.2";
                    HttpResponseMessage getWorkItemsHttpResponse = client.GetAsync(workItemQuery).Result;

                    if (getWorkItemsHttpResponse.IsSuccessStatusCode)
                    {
                        var result = getWorkItemsHttpResponse.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
}
//}
