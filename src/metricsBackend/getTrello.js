var config = require('../config/config');
var Trello = require("node-trello");
// var listID = [];
// var cardID = [];
var arr = [];
var cardArr = [];

var systemID;
var sprintID;
var oldSprint;
var sprintName;
var oldSprint;

var result;
var stories;
var fs = require('fs');

exports.getList = (board) => {
    return new Promise((resolve, reject) => {
        var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");

        //use function below to pull all of danny's boards with their id's
        //  t.get("/1/members/me/boards", { fields: "id,name"}, function(err, boards) {
        //   console.log(boards);
        //   console.log(err);
        // })
        //pulls board from trello associated with token above
        t.get("/1/boards/" + board + "/lists", function (err, data) {
            if (err) throw err;
            //loops through and finds id for list after demo list
            var acceptedCount = 0;
            for (i = 0; i < data.length; i++) {
                var listName = data[i].name.toLowerCase();
                if (listName.includes('accepted')) {
                    if (acceptedCount == 0) {
                        resolve(data[i]);
                        listID = data[i].id;
                        acceptedCount++;
                    }
                }
            }
        });
    })
}
//used to pull card information from the most recent accepted list
exports.getAcceptedCards = () => {
    return new Promise((resolve, reject) => {
        var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");
        t.get("/1/lists/" + listID + "/cards", function (err, cardData) {
            if (err) throw err;
            resolve(cardData);
        });
    })
}

exports.getAllLists = (board) => {
    return new Promise((resolve, reject) => {
        var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");
        var newStories = [];


        //pulls lists from trello associated with board passed form front end
        t.get("/1/boards/" + board + "/lists", function (err, data) {
            if (err) throw err;
            //loops through and passes id's for all acepted lists with the most recent list first in array
            var j = 0;
            for (i = 0; i < data.length; i++) {
                var listName = data[i].name.toLowerCase();
                if (listName.includes('accepted')) {
                    oldSprint = data[i]
                    // for (var list in oldSprint) {
                    systemID = oldSprint.idBoard;
                    sprintID = oldSprint.id;
                    var sprint = oldSprint.name.split(/[\s]+/);
                    sprintName = "Sprint " + sprint[2];

                    
                    t.get("/1/lists/" + sprintID + "/cards", function (err, cardData) {
                        if (err) throw err;

                        result = cardData
                        for (k = 0; k < result.length; k++) {
                            var name = JSON.stringify(result[k].name);
                            var pointsExp = /\(([^)]+)\)/;
                            var point = pointsExp.exec(name);

                            let story = {
                                'story_id': result[k].id,
                                'sprint_id': sprintID,
                                'story_name': result[k].name,
                                'story_points': point !== null ? point[1] : "no points"
                            }

                            newStories.push(story);
                            // console.log(newStories)
                        }
                        
                    });
                   
                    loadAll(newStories);
                }
            }
            // resolve(arr);
        });
    })
}

exports.getAllCards = (id) => {
    return new Promise((resolve, reject) => {
        var t = new Trello("68b96eeaad12e1cd6c22742f48289557", "c6910a2d151a944167560fd55fb977b862a32fc65d27025ee005bb02ea2610b5");
        t.get("/1/lists/" + id + "/cards", function (err, cardData) {
            if (err) throw err;
            resolve(cardData);
        });
    })
}

function loadAll(t){
    // var newStories = JSON.stringify(t);
    var newStories = t;
    console.log("2 " + t)
    let stories = {
        "system_id": systemID,
        "sprint_id": sprintID,
        "sprint_name": sprintName,
        "table_name": "agile_story",
        "table_rows": newStories
    };

    var sprintList = sprintName.split(":");
    var sprint = sprintList[0];
    var path = "Z:\\Metrics\\Exports\\NoJs_" + sprint + ".json";
    fs.writeFile(path, JSON.stringify(stories, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been loggged to NoJs_" + sprint + ".json");
        sprintName = "";

    });
}