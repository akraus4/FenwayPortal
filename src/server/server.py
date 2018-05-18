#!/usr/bin/python
import MySQLdb
from flask import Flask, json, jsonify, request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
db = MySQLdb.connect(
    host="52.55.14.143",  # your host
    user="fg_user_dev2",  # username
    passwd="6UhjVvAgM_Jm",  # password
    db="fg_metrics_dev2")
#  host= "52.55.14.143",
# user= "fg_user",
# passwd= "uXQ1pgjZlne7",
# db= "fg_metrics")  # name of the database

# Create a Cursor object to execute queries.
cur = db.cursor()


@app.route("/findAllTeams")
def findAllTeams():
    allTeams = []
    individualTeam = {}
    i = 0
    cur.execute("SELECT * FROM agile_system ORDER BY agile_system_name ASC")
    for row in cur.fetchall():
        individualTeam['agile_system_id'] = row[0]
        individualTeam['agile_system_name'] = row[1]
        individualTeam['agile_system_type'] = row[2]
        individualTeam['work_team_id'] = row[3]
        allTeams.insert(i, individualTeam)
        individualTeam = {}
        i = i+1
    return json.dumps(allTeams)


@app.route("/findAllSprintsBySystem/<system_id>")
def findAllSprintsBySystem(system_id):
    allSprints = []
    individualSprint = {}
    i = 0
    cur.execute("SELECT * FROM agile_sprint WHERE agile_system_id = '" +
                system_id + "' ORDER BY agile_sprint_name ASC")
    for row in cur.fetchall():
        individualSprint['agile_sprint_id'] = row[0]
        individualSprint['agile_sprint_name'] = row[1]
        individualSprint['agile_system_id'] = row[2]
        individualSprint['sprint_description'] = row[3]
        individualSprint['sprint_start_date'] = row[4]
        individualSprint['sprint_end_date'] = row[5]
        allSprints.insert(i, individualSprint)
        individualSprint = {}
        i = i+1
    return json.dumps(allSprints)


@app.route("/findAllStoriesWithUsersBySprint/<sprint_id>")
def findAllStoriesWithUsersBySprint(sprint_id):
    allSprints = []
    individualSprint = {}
    i = 0

    cur.execute("select * from agile_story "
                + "inner join agile_story_agile_system_user "
                + "on agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id "
                + "inner join agile_system_user "
                + "on agile_system_user.agile_system_user_id = agile_story_agile_system_user.agile_system_user_id "
                + "inner join agile_sprint "
                + "on agile_story.agile_sprint_id = agile_sprint.agile_sprint_id "
                + "where agile_story.agile_sprint_id in ('" + sprint_id + "') "
                + "and agile_story.agile_story_id = agile_story_agile_system_user.agile_story_id "
                + "and agile_story_agile_system_user.agile_system_user_id = agile_system_user.agile_system_user_id;")

    for row in cur.fetchall():
        individualSprint['agile_story_id'] = row[0]
        individualSprint['agile_sprint_name'] = row[1]
        individualSprint['story_type'] = row[2]
        individualSprint['agile_system_user_story_points'] = row[3]
        individualSprint['agile_system_user_name'] = row[4]
        allSprints.insert(i, individualSprint)
        individualSprint = {}
        i = i+1
    return json.dumps(allSprints)


# @app.route("/getColumnData/<tableName>")
# def getColumnData():
#     column = []
#     cur.execute("SELECT * FROM agile_sprint")
#     for row in cur.fetchall():
#         column['agile_sprint_id'] = row[0]
#         column['agile_sprint_name']= row[1]
# 	    column['agile_system_id']= row[2]
# 	    column['sprint_description']= row[3]
# 	    column['sprint_start_date']= row[4]
# 	    column['sprint_end_date']= row[5]
#     return json.dumps(column)   

@app.route("/getColumnData")
def getColumnData():
    allTeams = []
    individualTeam = {}
    i = 0
    cur.execute("SELECT * FROM agile_sprint")
    for row in cur.fetchall():
        individualTeam['agile_sprint_id'] = row[0]
        individualTeam['agile_sprint_name'] = row[1]
        individualTeam['agile_system_id'] = row[2]
        individualTeam['sprint_description'] = row[3]
        individualTeam['sprint_start_date'] = row[4]
        individualTeam['sprint_end_date'] = row[5]
        allTeams.insert(i, individualTeam)
        individualTeam = {}
        i = i+1
    return json.dumps(allTeams)       

if __name__ == "__main__":
     app.run()
