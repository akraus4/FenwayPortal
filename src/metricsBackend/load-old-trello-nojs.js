var Trello = require("node-trello");
var getTrello = require('./getTrello')
var systemID;
var sprintID;
var allAccepted;
var oldSprint;
var sprintName;
var oldSprint;
var result;
var stories;
var fs = require('fs');
var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");

getTrello.getAllLists("59395d4f04c5416b8e7ed9a9").then((allAccepted) => {
        getTrello.getAllCards(allAccepted).then((newStories) => {
                getTrello.writeAllCards(newStories).then((newStories) => {
                })
        })
})
                        //         let listInfo = {
                        //                 'sprint_id': sprintID,
                        //                 'system_id': systemID,
                        //                 'sprint_name': "Sprint " + sprint[2],
                        //                 'sprint_start_date': sprint[3],
                        //                 'sprint_end_date': sprint[4]
                        // }






