var config = require("../config/config");

const mysql = require("mysql");
// const uuidv1 = require("uuid/v1");

exports.postTimecards = timecards => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database
    });
    connection.connect(err => {
      if (err) throw err;

      timecards.forEach(timecard => {
        // Add or update work_team
        if (timecard["resource_plan.sys_id"]) {
          var work_team = {};
          work_team.work_team_id = timecard["resource_plan.sys_id"];
          work_team.work_team_name =
            timecard["resource_plan.short_description"];
          work_team.project_id = timecard["resource_plan.sys_id"];
          work_team.project_name = timecard["resource_plan.short_description"];

          var sql = `insert into work_team (work_team_id, work_team_name, project_id, project_name) values ("${
            work_team.work_team_id
          }","${work_team.work_team_name}","${work_team.project_id}","${
            work_team.project_name
          }")
                                on duplicate key update work_team_name="${
                                  work_team.work_team_name
                                }", project_id="${
            work_team.project_id
          }", project_name="${work_team.project_name}"`;
          connection.query(sql, (err, result) => {
            if (err) throw err;
          });
        }

        // Add or update work_user
        if (timecard["user.sys_id"]) {
          var work_user = {};
          work_user.work_user_id = timecard["user.sys_id"];
          work_user.firstname = timecard["user.first_name"];
          work_user.lastname = timecard["user.last_name"];
          work_user.email = timecard["user.email"];

          var sql = `insert into work_user (work_user_id, firstname, lastname, email) values ("${
            work_user.work_user_id
          }","${work_user.firstname}","${work_user.lastname}","${
            work_user.email
          }")
                                on duplicate key update firstname="${
                                  work_user.firstname
                                }", lastname="${work_user.lastname}", email="${
            work_user.email
          }"`;
          connection.query(sql, (err, result) => {
            if (err) throw err;
          });
        }

        // Add or update work_team_member
        if (timecard["user.sys_id"] && timecard["resource_plan.sys_id"]) {
          var work_team_member = {};
          work_team_member.work_team_member_id = timecard["user.sys_id"] + timecard["resource_plan.sys_id"];
          work_team_member.work_user_id = timecard["user.sys_id"];
          work_team_member.work_team_id = timecard["resource_plan.sys_id"];

          var sql = `insert ignore into work_team_member (work_team_member_id, work_user_id, work_team_id) values ("${
            work_team_member.work_team_member_id
          }","${work_team_member.work_user_id}","${
            work_team_member.work_team_id
          }")`;
          connection.query(sql, (err, result) => {
            if (err) throw err;
          });

          // Add or update work_dailyhours
          var weekdays = [
            "saturday",
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday"
          ];
          var currentdate = new Date(timecard["week_starts_on"]);
          weekdays.forEach(weekday => {
            var dailyhours = {};
            dailyhours.work_dailyhours_id = '' + work_team_member.work_team_member_id + currentdate.getFullYear() +
              (currentdate.getMonth() + 1) + currentdate.getDate() ;
            dailyhours.work_team_member_id =
              work_team_member.work_team_member_id;
            dailyhours.work_date =
              currentdate.getFullYear() +
              "/" +
              (currentdate.getMonth() + 1) +
              "/" +
              currentdate.getDate();
            dailyhours.hours = timecard[weekday];

            var sql = `insert into work_dailyhours (work_dailyhours_id, work_team_member_id, work_date, hours) values ("${
              dailyhours.work_dailyhours_id
            }","${dailyhours.work_team_member_id}","${dailyhours.work_date}","${
              dailyhours.hours
            }")
                                    on duplicate key update hours="${
                                      dailyhours.hours
                                    }"`;
            connection.query(sql, (err, result) => {
              if (err) throw err;
            });
            // move to next date
            currentdate.setDate(currentdate.getDate() + 1);
          });
        }
      });

      connection.end(err => {
        if (err) throw err;
        resolve();
      });
    });
  });
};
