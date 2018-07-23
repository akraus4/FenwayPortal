var config = require("../config/config");
var database = require("./sprints-db");
var metricsdb = require("./metrics-db");

const uuidv1 = require("uuid/v1");

// Check that input filepath is provided
if (!process.argv[2]) {
  console.log("Please provide a filepath");
  process.exit(1);
}
console.log(`Loading sprints from ${process.argv[2]}`);

// Load filepath contents and parse data
var fs = require("fs");
var content = fs.readFileSync(process.argv[2]);
var data = JSON.parse(content);

var metrics = {};
var team_id = data["team_id"];
var sprints = data["sprint"];

database.getSystemIdForTeam(team_id).then(system_id => {
  database.getTeamMembersForSystem(system_id).then(result => {
    // Create a "map" of the team members
    var team_members = {};
    result.forEach(row => {
      team_members[row.agile_system_user_name] = row.agile_system_user_id;
    });

    metrics["ref:agile_sprint"] = [];
    metrics["ref:agile_story"] = [];
    metrics["ref:agile_story_agile_system_user"] = [];

    var sprintList = [];
    sprints.forEach(in_sprint => {
      sprintList.push(in_sprint["sprint_id"]);
      var sprint = {
        agile_sprint_id: uuidv1(),
        agile_system_id: system_id,
        agile_sprint_name: in_sprint["sprint_id"],
        sprint_description: in_sprint["sprint_name"],
        sprint_start_date: in_sprint["sprint_start_date"],
        sprint_end_date: in_sprint["sprint_end_date"]
      };
      var stories = in_sprint["stories"];
      stories.forEach(in_story => {
        var story = {
          agile_story_id: uuidv1(),
          agile_sprint_id: sprint["agile_sprint_id"],
          agile_story_name: in_story["story_id"],
          story_description: in_story["story_description"],
          story_status: in_story["story_status"],
          story_type: in_story["story_type"],
          story_points: in_story["story_points"]
        };

        var members = in_story["assigned_to"];
        members.forEach(in_member => {
          var member = {
            agile_story_agile_system_user_id: uuidv1(),
            agile_story_id: story["agile_story_id"],
            agile_system_user_id: team_members[in_member["user"]],
            agile_system_user_story_points: in_member["user_points"]
          };
          metrics["ref:agile_story_agile_system_user"].push(member);
        });

        metrics["ref:agile_story"].push(story);
      });

      metrics["ref:agile_sprint"].push(sprint);
    });
    database
      .deleteSprints(system_id, sprintList)
      .then(() => {
        // Send data to database load
        metricsdb.loadMetrics(metrics);
      })
      .catch(err => {
        console.log(err);
      });
  });
});
