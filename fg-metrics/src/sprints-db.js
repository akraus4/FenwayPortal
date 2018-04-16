var config = require("../config/config");

const mysql = require("mysql");
const uuidv1 = require("uuid/v1");

// Get SystemId from database for provided team
exports.getSystemIdForTeam = team_id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect(err => {
      if (err) throw err;

      var sql = `select agile_system_id from agile_system where work_team_id = '${team_id}'`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result[0]["agile_system_id"]);
      });
      connection.end(err => {});
    });
  });
};

// Get Team members list for System
exports.getTeamMembersForSystem = system_id => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect(err => {
      if (err) throw err;

      var sql = `select agile_system_user_id, agile_system_user_name from agile_system_user where agile_system_id = '${system_id}'`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
      connection.end(err => {});
    });
  });
};

// Drop existing sprint and related stories and story users
exports.deleteSprints = (system_id, sprintList) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect(err => {
      if (err) throw err;

      var sql = `delete from agile_story_agile_system_user where agile_story_id in (select agile_story_id from agile_story where agile_sprint_id in (select agile_sprint_id from agile_sprint where agile_sprint_name in (${sprintList.map(
        x => "'" + x + "'"
      )}) and agile_system_id = '${system_id}'))`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        var sql = `delete from agile_story where agile_sprint_id in (select agile_sprint_id from agile_sprint where agile_sprint_name  in (${sprintList.map(
          x => "'" + x + "'"
        )}) and agile_system_id = '${system_id}')`;
        // connection.end(err => {});
        connection.query(sql, (err, result) => {
          if (err) throw err;
          var sql = `delete from agile_sprint where agile_sprint_name  in (${sprintList.map(
            x => "'" + x + "'"
          )}) and agile_system_id = '${system_id}'`;
          // connection2.end(err => {});
          connection.query(sql, (err, result) => {
            if (err) throw err;
            connection.end(err => {});
            resolve();
          });
        });
      });
    });
  });
};
