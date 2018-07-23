var Trello = require("node-trello");
var getTrello = require('./getTrello')
var systemID;
var sprintID;
var oldSprint;
var sprintName;
var oldSprint;
var newStories = [];
var result;
var stories;
var fs = require('fs');
var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");

getTrello.getAllLists("59395d4f04c5416b8e7ed9a9").then((allAccepted) => {
        // for (i = 0; i < allAccepted.length; i++) {
        //         oldSprint = allAccepted[i]
        //         systemID = oldSprint.idBoard;
        //         sprintID = oldSprint.id;
        //         var sprint = oldSprint.name.split(/[\s]+/);
        //         sprintName = "Sprint " + sprint[2];
        //         //         let listInfo = {
        //         //                 'sprint_id': sprintID,
        //         //                 'system_id': systemID,
        //         //                 'sprint_name': "Sprint " + sprint[2],
        //         //                 'sprint_start_date': sprint[3],
        //         //                 'sprint_end_date': sprint[4]
        //         // }
        //         t.get("/1/lists/" + sprintID + "/cards", function (err, cardData, allStories) {
        //                  newStories = new Promise((resolve, reject) => {
        //                         if (err) throw err;
        //                         result = cardData
        //                         for (k = 0; k < result.length; k++) {
        //                                 var name = JSON.stringify(result[k].name);
        //                                 var pointsExp = /\(([^)]+)\)/;
        //                                 var point = pointsExp.exec(name);
        //                                 // let member = {
        //                                 //         'system_id': systemID,
        //                                 //         'story_id': result[card].id,
        //                                 //         'member_id': result[card].idMembers
        //                                 // }
        //                                 let story = {
        //                                         'story_id': result[k].id,
        //                                         'sprint_id': sprintID,
        //                                         'story_name': result[k].name,
        //                                         'story_points': point !== null ? point[1] : "no points"
        //                                 }
        //                         }
        //                         resolve(story);
        //                 });
        //         });
        //         let stories = {
        //                 "system_id": systemID,
        //                 "sprint_id": sprintID,
        //                 "sprint_name": sprintName,
        //                 "table_name": "agile_story",
        //                 "table_rows": newStories
        //         };
        //         console.log(stories)
        //         var sprintList = sprintName.split(":");
        //         var sprint = sprintList[0];
        //         var path = "A:\\Metrics\\Exports\\NoJs_" + sprint + ".json";
        //         // fs.writeFile(path, JSON.stringify(stories, null, 4), (err) => {
        //         //         if (err) {
        //         //                 console.error(err);
        //         //                 return;
        //         //         };
        //         //         console.log("File has been loggged to NoJs_" + sprint + ".json");
        //         // });
        // }
})





