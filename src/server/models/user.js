var bcrypt = require('bcrypt');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'new_password',
	database: 'webpackcli'
});

// host: '52.55.14.143',
// 	user: 'fg_user_dev2',
// 	password: '6UhjVvAgM_Jm',
// 	database: 'fg_metrics_dev2'

connection.connect(function() {
	console.log("Database connected");
});

// // //This pulls back sprints from the sprint table.
module.exports.findAllSprints = function(callback) {
	var queryString = 'SELECT * FROM agile_sprint ORDER BY agile_sprint_id DESC';
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
	 callback(err, rows, fields)
		for (var i in rows) {
			console.log('Sprints: ', rows[i]);
		}
	});
}

//  This pulls back all Team Names from system table
 module.exports.findAllTeams = function(callback) {
 var queryString = 'SELECT * FROM agile_system ORDER BY agile_system_id DESC';
 connection.query(queryString, function(err, rows, fields) {
     if (err) throw err;
  callback(err, rows, fields)
     for (var i in rows) {
         console.log('Teams: ', rows[i]);
     }
 });
}



	// //This pulls back stories from the story table
module.exports.findAllStories = function(callback) {
	var queryString = 'SELECT * FROM agile_story ORDER BY agile_sprint_id DESC';
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
	 callback(err, rows, fields)
		for (var i in rows) {
			console.log('Stories: ', rows[i]);
		}
	});
	}

// module.exports.findAll = function(callback) {
// 	connection.query("SELECT * FROM users ORDER BY id DESC", callback);
// 	console.log();
// }


module.exports.addUser = function(data, callback) {
	connection.query("INSERT INTO users SET ?", data, callback);
}

module.exports.findByUsername = function(username, callback) {
	connection.query("SELECT * FROM users WHERE username = '" + username + "'", callback);
}

module.exports.encrypt = function(data, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(data.password, salt, callback);
	})
}

module.exports.sendResponse = function(success, res) {
	if(success) {
		res.send({'success': 'true'});
	} else {
		res.send({'success': 'false'});
	}
}