var getTrello = require('./getTrello')
var systemID;
var sprintID;
var sprintName;
var sprintStartDate;
var sprintEndDate;
var fs = require('fs');

var config = require('../config/config');

//********Add the team you wish to pull stories for.
var team = config.teams.noJsTeam;

getTrello.getList(team.key, team.token, team.board, team.acceptedColumn).then((listResult) => {
        // var newList = [];
        for (var list in listResult) {
                systemID = listResult.idBoard;
                sprintID = listResult.id;

                var sprint = listResult.name.split(/[\s]+/);
                sprintName = "Sprint " + sprint[2];
                sprintStartDate = sprint[3];
                sprintEndDate = sprint[4];

        }
        getTrello.getAcceptedCards(team.key, team.token).then((result) => {
                var newStories = [];

                for (var card in result) {

                        var name = JSON.stringify(result[card].name);
                        var pointsExp = /\(([^)]+)\)/;
                        var point = pointsExp.exec(name);
                        let member = {
                                'user': result[card].idMembers[0],
                                'user_points' : point !== null ? point[1] : "no points",
                        }

                        let story = {
                                'story_id': result[card].id,
                                'story_points':  point !== null ? point[1] : "no points",
                                'assigned _ to': member

                        }
                        newStories.push(story)
                        console.log(story)
                }

                let stories = {
                        "sprint_id": sprintID,
                        "sprint_name": sprintName,
                        "sprint_start_date": sprintStartDate,
                        "sprint_end_date": sprintEndDate,
                        "stories: ": newStories
                };
                
                
                //must create a Metrics folder on your C drive to work
                var path = "C:\\Metrics\\" + team.name + "_" + sprintName + ".json";
                fs.writeFile(path, JSON.stringify(stories, null, 4), (err) => {
                        if (err) {
                                console.error(err);
                                return;
                        };
                        console.log("File has been loggged to NoJs_" + sprintName + ".json");
                });
        })
})



