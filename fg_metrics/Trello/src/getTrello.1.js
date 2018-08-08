var config = require('../config/config');
var Trello = require("node-trello");
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

exports.getList = (key, token, board, acceptedColumn) => {
    return new Promise((resolve, reject) => {
        var t = new Trello(key, token);
        //pulls board from trello associated with token above
        t.get("/1/boards/" + board + "/lists", function (err, data) {
            if (err) throw err;
            //loops through and finds id for list after demo list
            var acceptedCount = 0;
            for (i = 0; i < data.length; i++) {
                var listName = data[i].name.toLowerCase();
                if (listName.includes('accepted')) {
                    if (acceptedCount == acceptedColumn) {
                        resolve(data[i]);
                        listID = data[i].id;
                    }
                    acceptedCount++;
                }
            }
        });
    })
}
//used to pull card information from the most recent accepted list
exports.getAcceptedCards = (key, token) => {
    return new Promise((resolve, reject) => {
        var t = new Trello(key, token);
        t.get("/1/lists/" + listID + "/cards", function (err, cardData) {
            if (err) throw err;
            resolve(cardData);
        });
    })
}

