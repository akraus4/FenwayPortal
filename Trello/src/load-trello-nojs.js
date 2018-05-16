var getTrello = require('./getTrello')
var systemID;
var sprintID;
var sprintName;
var sprintStartDate;
var sprintEndDate;
var fs = require('fs');
// var database = require('./database')

getTrello.getList("59395d4f04c5416b8e7ed9a9").then((listResult) => {
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
                
                
                //must create a Metrics folder on your C drive to work
                var path = "C:\\Metrics\\NoJs_" + sprintName + ".json";
                fs.writeFile(path, JSON.stringify(stories, null, 4), (err) => {
                        if (err) {
                                console.error(err);
                                return;
                        };
                        console.log("File has been loggged to NoJs_" + sprintName + ".json");
                });
        })
})



