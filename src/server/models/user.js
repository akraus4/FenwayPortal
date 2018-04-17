var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '52.55.14.143',
	user: 'fg_user_dev2',
	password: '6UhjVvAgM_Jm',
	database: 'fg_metrics_dev2'
});

	// host: 'localhost',
	// user: 'root',
	// password: 'new_password',
	// database: 'webpackcli'

connection.connect(function () {
	// console.log("Database connected");
});

//  This pulls back all Team Names from system table
module.exports.findAllTeams = function (callback) {
	var queryString = 'SELECT * FROM agile_system ORDER BY agile_system_name ASC';
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			//  console.log('Teams: ', rows[i]);
		}
	});
}

//  This pulls back agile_system with agile system user
module.exports.findSystemWithSystemUserWithWorkTeam = function (callback) {
	var queryString = 'SELECT * FROM agile_system LEFT OUTER JOIN agile_system_user ON agile_system.agile_system_id = agile_system_user.agile_system_id LEFT OUTER JOIN work_team ON agile_system.work_team_id = work_team.work_team_id';
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			//  console.log(rows);
		}
	});
}

//  This pulls back agile_system_user with agile system.
module.exports.findSystemUserWithSystemWithTeamMemberWithWorkUser = function (callback) {
	var queryString = 'SELECT * FROM agile_system_user LEFT OUTER JOIN agile_system ON agile_system_user.agile_system_id = agile_system.agile_system_id LEFT OUTER JOIN work_team_member ON agile_system_user.work_team_member_id = work_team_member.work_team_member_id LEFT OUTER JOIN work_user ON agile_system_user.work_user_id = work_user.work_user_id ';
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			//  console.log(rows);
		}
	});
}

// // //This pulls back sprints from the sprint table.
module.exports.findAllSprints = function (callback) {
	var queryString = 'SELECT * FROM agile_sprint ORDER BY agile_sprint_id ASC';
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			// console.log('Sprints: ', rows[i]);
		}
	});
}

// // //This pulls back sprints by system.
module.exports.findAllSprintsBySystem = function (system_id, callback) {
	var queryString = "SELECT * FROM agile_sprint WHERE agile_system_id = '" + system_id + "' ORDER BY agile_sprint_name ASC";
	// console.log(queryString);
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			// console.log('Sprints: ', rows[i]);
		}
	});
}

// // //This pulls back sprints by system.
module.exports.findAllStoriesBySprint = function (sprint_id, callback) {
	var queryString = "SELECT * FROM agile_story WHERE agile_sprint_id = '" + sprint_id + "' ORDER BY agile_story_name ASC";
	console.log(queryString);
	connection.query(queryString, function (err, rows, fields) {
		if (err) throw err;
		callback(err, rows, fields)
		for (var i in rows) {
			// console.log('story: ', rows[i]);
		}
	});
}

// // //This pulls back stories from the story table
// module.exports.findAllStories = function (callback) {
// 	var queryString = 'SELECT * FROM agile_story ORDER BY agile_sprint_id DESC';
// 	connection.query(queryString, function (err, rows, fields) {
// 		if (err) throw err;
// 		callback(err, rows, fields)
// 		for (var i in rows) {
// 			// console.log('Stories: ', rows[i]);
// 		}
// 	});
// }

// //This pulls back all from agile_story_system_user.
module.exports.findAllStoriesWithUsersBySprint = function (sprint_id, callback) {
	//var queryString = "SELECT * FROM agile_story_agile_system_user WHERE agile_story_id = '" + story_id + "'";
	var queryString =
	// "select agile_story.agile_story_id,agile_story.agile_story_name,agile_story.agile_sprint_id,agile_story.story_type,agile_story.story_points,agile_story_agile_system_user.agile_system_user_id from fg_metrics_dev2.agile_story inner join fg_metrics_dev2.agile_story_agile_system_user on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id where agile_story.agile_story_id = '" + story_id + "';"
	"select * from fg_metrics_dev2.agile_story inner join fg_metrics_dev2.agile_story_agile_system_user on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id where agile_story.agile_sprint_id = '" + sprint_id +  "' and agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id;"
 
	//console.log(queryString);
	connection.query(queryString, function (err, rows, fields) {	
		if (err) throw err;
		callback(err, rows, fields)
		// for (var i in rows) {
			 console.log('story: ', rows);
		// }
	});
}

// // // //This pulls back sprints and users by system.
// module.exports.findAllStoriesAndUsersBySprint = function (sprint_id,story_id, callback) {
// 	var queryString = "SELECT * FROM agile_story JOIN agile_story_agile_system_user WHERE agile_story.agile_sprint_id =  '" + sprint_id + "' AND agile_story.agile_story_id = '" + story_id + "'";
// 	console.log(queryString);
// 	connection.query(queryString, function (err, rows, fields) {
// 		if (err) throw err;
// 		callback(err, rows, fields)
// 		for (var i in rows) {
// 			console.log('story: ', rows[i]);
// 		}
// 	});
// }

// module.exports.findAll = function(callback) {
// 	connection.query("SELECT * FROM users ORDER BY id DESC", callback);
// 	console.log();
// }


module.exports.addUser = function (data, callback) {
	connection.query("INSERT INTO users SET ?", data, callback);
}

module.exports.findByUsername = function (username, callback) {
	connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
}

module.exports.encrypt = function (data, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		bcrypt.hash(data.password, salt, callback);
	})
}

module.exports.sendResponse = function (success, res) {
	if (success) {
		res.send({ 'success': 'true' });
	} else {
		res.send({ 'success': 'false' });
	}
}