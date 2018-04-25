var bcrypt = require('bcrypt');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: '52.55.14.143',
	user: 'fg_user_dev2',
	password: '6UhjVvAgM_Jm',
	database: 'fg_metrics_dev2'
	// host: 'localhost',
	// user: 'root',
	// password: 'new_password',
	// database: 'webpackcli'
});


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

// // //This pulls back sprints by system.
module.exports.findAllUsersBySystem = function (system_id, callback) {
	var queryString = "SELECT * FROM agile_system_user WHERE agile_system_id = '" + system_id + "' ORDER BY agile_system_user_name ASC";
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
module.exports.findAllStoriesWithUsersBySprint = function (sprint_ids, callback) {
	var sprintIds = ''; 
	console.log('sprint length = ' +  sprint_ids.length);
	for(i=0; i < sprint_ids.length; i++){ 
		if(i == 0){
			sprintIds = sprint_ids[i];
			console.log('sprint1 = ' +  sprint_ids[i]);
		}else{
			sprintIds = sprintIds + "', '" + sprint_ids[i];
			console.log('sprint2 = ' +  sprint_ids[i]);
		}
	 
	}
	var queryString =
	// "select * from webpackcli.agile_story inner join webpackcli.agile_story_agile_system_user on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id where agile_story.agile_sprint_id = '" + sprint_id +  "' and agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id;"
	// "select * from agile_story inner join agile_story_agile_system_user on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id inner join agile_system_user on agile_system_user.agile_system_user_id = agile_story_agile_system_user.agile_system_user_id where agile_story.agile_sprint_id = '" + sprint_id + "' and agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id and agile_story_agile_system_user.agile_system_user_id = agile_system_user.agile_system_user_id;";
	"select * from agile_story "
	+ "inner join agile_story_agile_system_user "
	+ "on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id "
	+ "inner join agile_system_user "
	+ "on agile_system_user.agile_system_user_id = agile_story_agile_system_user.agile_system_user_id "
	+ "inner join agile_sprint "
    + "on agile_story.agile_sprint_id = agile_sprint.agile_sprint_id "
	+ "where agile_story.agile_sprint_id in ('" + sprintIds + "') "
	+ "and agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id "
	+ "and agile_story_agile_system_user.agile_system_user_id = agile_system_user.agile_system_user_id;";

	console.log(queryString);
	connection.query(queryString, function (err, rows, fields) {	
		if (err) throw err;
		callback(err, rows, fields)
		// for (var i in rows) {
			 console.log('story: ', rows);
		// }
	});
// }
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