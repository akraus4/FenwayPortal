Executable JAR file which pulls in a configuration JSON containing the API Key, Team ID, and Team Members 
and uses that to query for stories which are associated with the team members. To execute the JAR file, use this command line:

For example:
java -jar rally.jar c:\scripts\CTL_Salesforce.json

It will export a JSON file in the c:\RallyMetrics directory, with the date and time and the name of the config file used as the new filename. The RallyMetrics directory MUST be created before running the script. 

For example:
20180618_174902_CTL_Salesforce.json