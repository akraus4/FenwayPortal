var getTrello = require('./getTrello')
var systemID;
var sprintID;
var sprintName;
var sprintStartDate;
var sprintEndDate;
var fs = require('fs');
// var database = require('./database')

getTrello.getList("5a2571728cac5d5f36ba5e5e").then((listResult) => {
        // var newList = [];
        for (var list in listResult) {
                systemID = listResult.idBoard;
                sprintID = listResult.id;

                var sprint = listResult.name.split(/[\s]+/);
                sprintName = "Sprint " + sprint[2];
                sprintStartDate = sprint[3];
                sprintEndDate = sprint[4];
                // let listInfo = {
                //         'sprint_id': sprintID,
                //         'system_id': systemID,
                //         'sprint_name': "Sprint " + sprint[2],
                //         'sprint_start_date': sprint[3],
                //         'sprint_end_date': sprint[4]
                // }
                // newList = listInfo;
                // console.log(newList)
        }
        getTrello.getAcceptedCards().then((result) => {
                var newStories = [];

                // var storyMember = [];
                //console.log(result)
                for (var card in result) {
                       // var user;
                        var name = JSON.stringify(result[card].name);
                        var pointsExp = /\(([^)]+)\)/;
                        var point = pointsExp.exec(name);
                        let member = {
                                'user': result[card].idMembers[0],
                                'user_points' : point !== null ? point[1] : "no points",
                        }
                        //user.push(member)

                        let story = {
                                'story_id': result[card].id,
                                'story_points':  point !== null ? point[1] : "no points",
                                'assigned _ to': member
                                // [
                                //         'user' : result[card].idMembers,
                                //         'user_points' : point[1]
                                // ]
                        }
                        newStories.push(story)
                        console.log(story)

                        // storyMember.push(member)
                }

                let stories = {
                        // "system_id": systemID,
                        "sprint_id": sprintID,
                        "sprint_name": sprintName,
                        "sprint_start_date": sprintStartDate,
                        "sprint_end_date": sprintEndDate,
                        "stories: ": newStories
                };
                //console.log(stories)
                // console.log(storyMember)
                // database.postTimecards(result)
                var path = "A:\\Metrics\\Exports\\Data_Scrubbers_" + sprintName + ".json";
                fs.writeFile(path, JSON.stringify(stories, null, 4), (err) => {
                        if (err) {
                                console.error(err);
                                return;
                        };
                        console.log("File has been loggged to Data_Scrubbers_" + sprintName + ".json");
                });
        })
})



