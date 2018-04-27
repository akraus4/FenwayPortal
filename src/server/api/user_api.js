var express = require('express')
	, app = express.Router()

// var app = express();

// Import User Module Containing Functions Related To User Data
var user = require('../models/user');

// API Routes

app.get('/findAllTeams', function (req, res) {

	user.findAllTeams(function (err, rows, fields) {
		if (err) throw err;
		// var teamName = []; console.log(rows);
		// for(i=0; i< rows.length; i++){
		// teamName[i] = rows[i].agile_system_name;      			
		// }
		// console.log(teamName);
		res.json(rows);
	});
});

app.get('/findSystemWithSystemUserWithWorkTeam', function (req, res) {

	user.findSystemWithSystemUserWithWorkTeam(function (err, rows, fields) {
		if (err) throw err;
		// var teamName = []; console.log(rows);
		// for(i=0; i< rows.length; i++){
		// teamName[i] = rows[i].agile_system_name;      			
		// }
		// console.log(teamName);
		res.json(rows);
	})
});

app.get('/findSystemUserWithSystemWithTeamMemberWithWorkUser', function (req, res) {

	user.findSystemUserWithSystemWithTeamMemberWithWorkUser(function (err, rows, fields) {
		if (err) throw err;
		// var teamName = []; console.log(rows);
		// for(i=0; i< rows.length; i++){
		// teamName[i] = rows[i].agile_system_name;      			
		// }
		// console.log(teamName);
		res.json(rows);
	})
});

app.get('/findAllSprints', function (req, res) {

	console.log('ok'); user.findAllSprints(function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	})
});

app.get('/findAllSprintsBySystem/:system_id', function (req, res) {
	var system_id = req.params.system_id;
	console.log(system_id);
	user.findAllSprintsBySystem(system_id, function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	})
});


// 
app.get('/findAllStoriesWithUsersBySprint/:sprint_id', function (req, res) {
	var sprint_id = req.params.sprint_id;
	// var stories = [];
	user.findAllStoriesWithUsersBySprint(sprint_id, function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
		// Array passed to front end
	})
});

// app.get('/findAllStoriesBySprint/:sprint_id', function (req, res) {
// 	var sprint_id = req.params.sprint_id;
// 	// var stories = [];
// 	user.findAllStoriesBySprint(sprint_id, function (err, rows, fields) {
// 		if (err) throw err;
// 		// Array passed to front end
// 		var storiesWithUser = [];
// 		//Individual story used in loop 
// 		var story;
// 		var storyLength = rows.length;
// 		var usersWithPoints = [];
// 		var usersWithTotalPoints = [];

// 		for (i = 0; i < storyLength; i++) {
// 			story = rows[i];

// 			user.findAllUsersByStory(rows[i].agile_story_id, function (err, rows2, fields) {
// 				if (err) throw err;

// 				// story.users = rows[0].agile_system_user_id;
// 				for (j = 0; j < rows2.length; j++) {

// 					let user = {
// 						'user': rows2[j].agile_system_user_id,
// 						'points': rows2[j].agile_system_user_story_points
// 					}

// 					usersWithPoints.push(user);

// 				}


// 				// console.log('user1 : ' + usersWithPoints);

// 				// storiesWithUser.push(story);

// 				// console.log(storiesWithUser);

// 				// //if it is last iteration then set result
// 				// if (i == storyLength) {
// 				// 	res.json(storiesWithUser);
// 				// }
// 			})
// 			console.log('i = ' + i + ' storyLength = ' + storyLength);
// 			if (i == storyLength) {
// 				console.log('i = ' + i + ' storyLength = ' + storyLength);
// 				console.log('user1 : ' + usersWithPoints);
// 				var results = JSON.stringify(usersWithPoints);
// 				results.sort(function (a, b) {
// 					return (+a.agile_system_user_id || 0) - (+b.agile_system_user_id || 0);
// 				});
// 				console.log('user2 : ' + results);
// 				}
// 		}

// 	})
// });

// app.get('/findAllStoriesAndUsersBySprint/:sprint_id, story_id', function(req, res) {
// 	var sprint_id = req.params.sprint_id;
// 		console.log(sprint_id, story_id);
// 		 user.findAllStoriesBySprint(sprint_id, story_id, function(err, rows, fields) {
// 			if(err) throw err;
// 			res.json(rows);
// 		})
// 	});

app.get('/', function (req, res) {

	// console.log('ok'); 
	user.findAllStories(function (err, rows, fields) {
		if (err) throw err;
		res.json(rows);
	})
});

app.post('/adduser', function (req, res, next) {

	var data = req.body;
	user.findByUsername(data.username, function (err, rows, fields) {
		if (rows.length == 1) {
			user.sendResponse(false, res);
		} else {
			user.encrypt(data, function (err, hash) {
				data = {
					username: data.username,
					hashedpassword: hash
				};
				user.addUser(data, function (err, info) {
					if (err) throw err;
					console.log(info);
					user.sendResponse(true, res);
				});
			});
		};
	});
});

module.exports = app;

