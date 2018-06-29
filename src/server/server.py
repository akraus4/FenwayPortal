#!/usr/bin/python
import MySQLdb
from flask import Flask, json, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

db = MySQLdb.connect(

# Development Database
    host="52.55.14.143",  # your host
    user="fg_user_dev2",  # username
    passwd="6UhjVvAgM_Jm",  # password
    db="fg_metrics_dev2",  # name of the database

# Production Database
    # host= "52.55.14.143",
    # user= "fg_user",
    # passwd= "uXQ1pgjZlne7",
    # db= "fg_metrics",

# Connect Properties
    charset="utf8",  # Encoding format
    autocommit = True # automatically commits changes to database
)

# Create a Cursor object to execute queries.
cur = db.cursor()

# Create list of JSON objects for Select Team drop down in Metrics Management page
@app.route("/findAllTeams")
def findAllTeams():
    jsonList = []
    addObject = {}
    i = 0
    cur.execute("SELECT * FROM agile_system ORDER BY agile_system_name ASC")
    for row in cur.fetchall():
        addObject['agile_system_name'] = row[0]
        addObject['agile_system_type'] = row[1]
        addObject['work_team_id'] = row[2]
        addObject['agile_system_id'] = row[3]
        jsonList.insert(i, addObject)
        addObject = {}
        i = i+1
    return json.dumps(jsonList)

# Create list of JSON objects for Select sprint drop down in Metrics Management Page
@app.route("/findAllSprintsBySystem/<system_id>")
def findAllSprintsBySystem(system_id):
    jsonList = []
    addObject = {}
    i = 0
    cur.execute("SELECT * FROM agile_sprint WHERE agile_system_id = '" +
                system_id + "' ORDER BY agile_sprint_name ASC")
    for row in cur.fetchall():
        addObject['agile_sprint_id'] = row[0]
        addObject['agile_sprint_name'] = row[1]
        addObject['agile_system_id'] = row[2]
        addObject['sprint_description'] = row[3]
        addObject['sprint_start_date'] = row[4]
        addObject['sprint_end_date'] = row[5]
        jsonList.insert(i, addObject)
        addObject = {}
        i = i+1
    return json.dumps(jsonList)

@app.route("/findTeamMemberByTeam/<work_team_id>")
def findTeamMemberByTeam(work_team_id):
    jsonList = []
    addObject = {}
    i = 0
    cur.execute("SELECT work_team_member_id, firstname, lastname FROM work_team_member A INNER JOIN work_user B ON B.work_user_id = A.work_user_id WHERE A.work_team_id = '" +
                work_team_id + "' ORDER BY firstname ASC")
    for row in cur.fetchall():
        addObject['work_team_member_id'] = row[0]
        addObject['name'] = row[1] + " " + row[2]
        # addObject['work_user_id'] = row[2]
        # addObject['expected_hours'] = row[3]
        jsonList.insert(i, addObject)
        addObject = {}
        i = i+1
    return json.dumps(jsonList)

# Create list of JSON objects for table in View Metrics Page
@app.route("/findAllStoriesWithUsersBySprint/<sprint_id>")
def findAllStoriesWithUsersBySprint(sprint_id):
    jsonList = []
    addObject = {}
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
        addObject['agile_story_id'] = row[0]
        addObject['agile_story_name'] = row[1]
        addObject['agile_sprint_id'] = row[2]
        addObject['story_Description'] = row[3]
        addObject['story_type'] = row[4]
        addObject['story_Status'] = row[5]
        addObject['story_points'] = row[6]
        addObject['agile_story_agile_system_user_id'] = row[7]
        addObject['agile_story_id_1'] = row[8]
        addObject['agile_system_user_id'] = row[9]
        addObject['agile_system_user_story_points'] = row[10]
        addObject['agile_system_user_id_1'] = row[11]
        addObject['agile_system_user_name'] = row[12]
        addObject['agile_system_id'] = row[13]
        addObject['work_team_member_id'] = row[14]
        addObject['work_user_id'] = row[15]
        addObject['agile_sprint_id_1'] = row[16]
        addObject['agile_sprint_name'] = row[17]
        addObject['agile_system_id_1'] = row[18]
        addObject['sprint_description'] = row[19]
        addObject['sprint_start_date'] = row[20]
        addObject['sprint_end_date'] = row[21]
        jsonList.insert(i, addObject)
        addObject = {}
        i = i+1
    return json.dumps(jsonList)

# Create list of JSON objects for tables in Data Management Page
@app.route("/findTableData/<table_name>")
def findTableData(table_name):
    print("Paramater: " + table_name)
    if table_name == "work_user":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('SELECT * FROM work_user')
        for row in cur.fetchall():
            addObject['work_user_id'] = row[0]
            addObject['firstname'] = row[1]
            addObject['lastname'] = row[2]
            addObject['email'] = row[3]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "work_team":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute("SELECT * FROM work_team")
        for row in cur.fetchall():
            addObject['work_team_id'] = row[0]
            addObject['work_team_name'] = row[1]
            addObject['project_id'] = row[2]
            addObject['project_name'] = row[3]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "work_team_member":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('SELECT work_team_member.work_team_member_id, work_team.work_team_id, work_user.work_user_id,work_team_member.expected_hours, work_team.work_team_name, work_user.firstname, work_user.lastname FROM work_team LEFT OUTER JOIN work_team_member ON work_team.work_team_id = work_team_member.work_team_id LEFT OUTER JOIN work_user ON work_user.work_user_id = work_team_member.work_user_id')
        for row in cur.fetchall():
            addObject['work_team_member_id'] = row[0]
            addObject['work_team_id'] = row[1]
            addObject['work_user_id'] = row[2]
            addObject['expected_hours'] = row[3]
            addObject['work_team_name'] = row[4]
            addObject['firstname'] = row[5]
            addObject['lastname'] = row[6]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "work_dailyhours":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('select work_dailyhours.work_dailyhours_id, work_team_member.work_team_member_id, work_dailyhours.work_date, work_dailyhours.hours, work_user.firstname, work_user.lastname from work_dailyhours left outer join work_team_member on work_team_member.work_team_member_id = work_dailyhours.work_team_member_id left outer join work_user on work_user.work_user_id = work_team_member.work_user_id')
        for row in cur.fetchall():
            addObject['work_dailyhours_id'] = row[0]
            addObject['work_team_member_id'] = row[1]
            addObject['work_date'] = row[2]
            addObject['hours'] = row[3]
            addObject['name'] = row[4] + ' ' + row[5]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1
    elif table_name == "agile_system":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('SELECT * FROM agile_system LEFT OUTER JOIN agile_system_user ON agile_system.agile_system_id = agile_system_user.agile_system_id LEFT OUTER JOIN work_team ON agile_system.work_team_id = work_team.work_team_id')
        for row in cur.fetchall():
            addObject['agile_system_id'] = row[0]
            addObject['agile_system_name'] = row[1]
            addObject['agile_system_type'] = row[2]
            addObject['work_team_id'] = row[3]
            addObject['agile_system_user_id'] = row[4]
            addObject['agile_system_user_name'] = row[5]
            addObject['agile_system_id_1'] = row[6]
            addObject['work_team_member_id'] = row[7]
            addObject['work_user_id'] = row[8]
            addObject['work_team_id_1'] = row[9]
            addObject['work_team_name'] = row[10]
            addObject['project_id'] = row[11]
            addObject['project_name'] = row[12]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "agile_system_user":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('SELECT * FROM agile_system_user LEFT OUTER JOIN agile_system ON agile_system_user.agile_system_id = agile_system.agile_system_id LEFT OUTER JOIN work_user ON agile_system_user.work_user_id = work_user.work_user_id')
        for row in cur.fetchall():
            addObject['agile_system_user_id'] = row[0]
            addObject['agile_system_user_name'] = row[1]
            addObject['agile_system_id'] = row[2]
            addObject['work_team_member_id'] = row[3]
            addObject['work_user_id'] = row[4]
            addObject['agile_system_id_1'] = row[5]
            addObject["agile_system_name"] = row[6]
            addObject["agile_system_type"] = row[7]
            addObject["work_team_id"] = row[8]
            addObject["work_user_id_1"] = row[9]
            addObject["firstname"] = row[10]
            addObject["lastname"] = row[11]
            addObject["email"] = row[12]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "agile_sprint":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute(
            'SELECT * FROM agile_sprint LEFT OUTER JOIN agile_system ON agile_sprint.agile_system_id = agile_system.agile_system_id')
        for row in cur.fetchall():
            addObject['agile_sprint_id'] = row[0]
            addObject['agile_sprint_name'] = row[1]
            addObject['agile_system_id'] = row[2]
            addObject['sprint_description'] = row[3]
            addObject['sprint_start_date'] = row[4]
            addObject['sprint_end_date'] = row[5]
            addObject['agile_system_id_1'] = row[6]
            addObject['agile_system_name'] = row[7]
            addObject['agile_system_type'] = row[8]
            addObject['work_team_id'] = row[9]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "agile_story":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute(
            'SELECT * FROM agile_story LEFT OUTER JOIN agile_sprint ON agile_story.agile_sprint_id = agile_sprint.agile_sprint_id')
        for row in cur.fetchall():
            addObject['agile_story_id'] = row[0]
            addObject['agile_story_name'] = row[1]
            addObject['agile_sprint_id'] = row[2]
            addObject['story_description'] = row[3]
            addObject['story_type'] = row[4]
            addObject['story_status'] = row[5]
            addObject['story_points'] = row[6]
            addObject['agile_sprint_id_1'] = row[7]
            addObject['agile_sprint_name'] = row[8]
            addObject['agile_system_id'] = row[9]
            addObject['sprint_description'] = row[10]
            addObject['sprint_start_date'] = row[11]
            addObject['sprint_end_date'] = row[12]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    elif table_name == "agile_story_agile_system_user":
        jsonList = []
        addObject = {}
        i = 0
        cur.execute('SELECT * FROM agile_story_agile_system_user LEFT OUTER JOIN agile_story ON agile_story_agile_system_user.agile_story_id = agile_story.agile_story_id LEFT OUTER JOIN agile_system_user ON agile_story_agile_system_user.agile_system_user_id = agile_system_user.agile_system_user_id')
        for row in cur.fetchall():
            addObject['agile_story_agile_system_user_id'] = row[0]
            addObject['agile_story_id'] = row[1]
            addObject['agile_system_user_id'] = row[2]
            addObject['agile_system_user_story_points'] = row[3]
            addObject['agile_story_id_1'] = row[4]
            addObject['agile_story_name'] = row[5]
            addObject['agile_sprint_id'] = row[6]
            addObject['story_description'] = row[7]
            addObject['story_type'] = row[8]
            addObject['story_status'] = row[9]
            addObject['story_points'] = row[10]
            addObject['agile_system_user_id_1'] = row[11]
            addObject['agile_system_user_name'] = row[12]
            addObject['agile_system_id'] = row[13]
            addObject['work_team_member_id'] = row[14]
            addObject['work_user_id'] = row[15]
            jsonList.insert(i, addObject)
            addObject = {}
            i = i+1
    return json.dumps(jsonList)

# Gets data for work_dailyhours table in Data Management Page
# @app.route("/findWorkDailyhoursData/<table_name>/<workTeams>")
# def findWorkDailyhoursData(table_name,workTeams):
#     print("Paramater: " + table_name)
#     print("team: " + workTeams) 
#     if table_name == "work_dailyhours":
#         jsonList = []
#         addObject = {}
#         i = 0
#         print("gooey gooeyr goo")
#         cur.execute("select work_dailyhours.work_dailyhours_id, work_team_member.work_team_member_id, work_dailyhours.work_date, work_dailyhours.hours, work_user.firstname, work_user.lastname from work_dailyhours left outer join work_team_member on work_team_member.work_team_member_id = work_dailyhours.work_team_member_id left outer join work_user on work_user.work_user_id = work_team_member.work_user_id where work_team_member.work_team_id in ('" + workTeams +"')")
#         print(cur.fetchall())
#         for row in cur.fetchall():
#             addObject['work_dailyhours_id'] = row[0]
#             addObject['work_team_member_id'] = row[1]
#             addObject['work_date'] = row[2]
#             addObject['hours'] = row[3]
#             # addObject['name'] = row[4] + ' ' + row[5] #error on this line
#             jsonList.insert(i, addObject)
#             addObject = {}
#             i=i+1
#         print(json.dumps(jsonList))
#     return json.dumps(jsonList)

# Finds work teams to populate work_dailyhours drop down in Data Management Page
@app.route("/findWorkTeams")
def findWorkTeams():
    jsonList = []
    addObject = {}
    i = 0
    cur.execute("SELECT * FROM work_team ORDER BY work_team_name ASC")
    for row in cur.fetchall():
        addObject['work_team_id'] = row[0]
        addObject['work_team_name'] = row[1]
        addObject['project_namework_team'] = row[2]
        addObject['project_name'] = row[3]
        jsonList.insert(i, addObject)
        addObject = {}
        i = i+1
    return json.dumps(jsonList)

# Insert/update statement to handle the modal add or edit for work_dailyhours table in data management
@app.route("/editTableDataWDailyhours/<wDailyhours_id>/<wTeam_member_id>/<work_date>/<hours>")
def editTableDataWDailyHours(wDailyhours_id,wTeam_member_id,work_date,hours):
    cur.execute("INSERT INTO work_dailyhours(work_dailyhours_id,work_team_member_id,work_date,hours)"
                + "Values('" + wDailyhours_id + "','" + wTeam_member_id + "','" + work_date + "','" + hours + "')"
                + "ON DUPLICATE KEY UPDATE work_team_member_id='" + wTeam_member_id + "', work_date='" + work_date + "', hours='" + hours + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for agile_system table in data management
@app.route("/editTableDataASystem/<aSystem_id>/<aSystem_name>/<aSystem_type>/<wTeam_id>")
def editTableDataASystem(aSystem_id,aSystem_name,aSystem_type,wTeam_id):
    cur.execute("INSERT INTO agile_system(agile_system_id,agile_system_name,agile_system_type,work_team_id)"
                + "Values('" + aSystem_id + "','" + aSystem_name + "','" + aSystem_type + "','" + wTeam_id + "')"
                + "ON DUPLICATE KEY UPDATE agile_system_name='" + aSystem_name + "', agile_system_type='" + aSystem_type + "', work_team_id='" + wTeam_id + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for work_user table in data management
@app.route("/editTableDataWUser/<wUserId>/<fName>/<lName>/<email>")
def editTableDataWUser(wUserId,fName,lName,email):
    cur.execute("INSERT INTO work_user(work_user_id,firstname,lastname,email)"
                + "Values('" + wUserId + "','" + fName + "','" + lName + "','" + email + "')"
                + "ON DUPLICATE KEY UPDATE work_user_id='" + wUserId + "', firstname='" + fName + "', lastname='" + lName + "', email='" + email + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for work_team table in data management
@app.route("/editTableDataWTeam/<wTeamId>/<wTeamName>/<pNameworkTeam>/<pName>")
def editTableDataWTeam(wTeamId,wTeamName,pNameworkTeam,pName):
    cur.execute("INSERT INTO work_team(work_team_id,work_team_name,project_namework_team,project_name)"
                + "Values('" + wTeamId + "','" + wTeamName + "','" + pNameworkTeam + "','" + pName + "')"
                + "ON DUPLICATE KEY UPDATE work_team_name='" + wTeamName + "', project_namework_team='" + pNameworkTeam + "', project_name='" + pName + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for work_team_member table in data management
@app.route("/editTableDataWTeamMember/<wTeamMemberId>/<wTeamId>/<wUserId>/<eHours>")
def editTableDataWTeamMember(wTeamMemberId,wTeamId,wUserId,eHours):
    cur.execute("INSERT INTO work_team_member(work_team_member_id,work_team_id,work_user_id,expected_hours)"
                + "Values('" + wTeamMemberId + "','" + wTeamId + "','" + wUserId + "','" + eHours + "')"
                + "ON DUPLICATE KEY UPDATE work_team_member_id='" + wTeamMemberId + "', work_team_id='" + wTeamId + "', work_user_id='" + wUserId + "', expected_hours='" + eHours + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for agile_system_user table in data management
@app.route("/editTableDataASystemUser/<asu_id>/<asu_name>/<aSystem_id>/<wtm_id>/<wu_id>")
def editTableDataASU(asu_id,asu_name,aSystem_id,wtm_id,wu_id):
    cur.execute("INSERT INTO agile_system_user(agile_system_user_id,agile_system_user_name,agile_system_id,work_team_member_id,work_user_id)"
                + "Values('" + asu_id + "','" + asu_name + "','" + aSystem_id + "','" + wtm_id + "','" + wu_id + "')"
                + "ON DUPLICATE KEY UPDATE agile_system_user_name='" + asu_name + "', agile_system_id='" + aSystem_id + "', work_team_member_id='" + wtm_id + "',work_user_id='" + wu_id + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for agile_sprint table in data management
@app.route("/editTableDataASprint/<aSprintId>/<aSprintName>/<aSystemId>/<sDescription>/<sStartDate>/<sEndDate>")
def editTableDataASprint(aSprintId,aSprintName,aSystemId,sDescription,sStartDate,sEndDate):
    cur.execute("INSERT INTO agile_sprint(agile_sprint_id,agile_sprint_name,agile_system_id,sprint_description,sprint_start_date,sprint_end_date)"
                + "Values('" + aSprintId + "','" + aSprintName + "','" + aSystemId + "','" + sDescription + "','" + sStartDate + "','" + sEndDate + "')"
                + "ON DUPLICATE KEY UPDATE agile_sprint_id='" + aSprintId + "', agile_sprint_name='" + aSprintName + "', agile_system_id='" + aSystemId + "',sprint_description='" + sDescription + "',sprint_start_date='" + sStartDate + "',sprint_end_date='" + sEndDate + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for agile_story table in data management
@app.route("/editTableDataAStory/<aStoryId>/<aSprintId>/<sType>/<sStatus>/<sPoints>")
def editTableDataAStory(aStoryId,aSprintId,sType,sStatus,sPoints):
    cur.execute("INSERT INTO agile_story(agile_story_id,agile_sprint_id,story_type,story_status,story_points)"
                + "Values('" + aStoryId + "','" + aSprintId + "','" + sType + "','" + sStatus + "','" + sPoints + "')"
                + "ON DUPLICATE KEY UPDATE agile_sprint_id='" + aSprintId + "',story_type='" + sType + "',story_status='" + sStatus + "',story_points='" + sPoints + "'")
                # + "ON DUPLICATE KEY UPDATE agile_story_id='" + aStoryId + "', agile_sprint_id='" + aSprintId + "',story_type='" + sType + "',story_status='" + sStatus + "',story_points='" + sPoints + "'")
    statementExecuted = "True"
    return statementExecuted

# Insert/update statement to handle the modal add or edit for agile_story_agile_system_user table in data management
@app.route("/editTableDataASAgileSystemUser/<aStoryAgileSystemUserId>/<aStoryId>/<aSystemUserId>/<aSystemUserStoryPoints>")
def editTableDataASAgileSystemUser(aStoryAgileSystemUserId,aStoryId,aSystemUserId,aSystemUserStoryPoints):
    cur.execute("INSERT INTO agile_story_agile_system_user(agile_story_agile_system_user_id,agile_story_id,agile_system_user_id,agile_system_user_story_points)"
                + "Values('" + aStoryAgileSystemUserId + "','" + aStoryId + "','" + aSystemUserId + "','" + aSystemUserStoryPoints + "')"
                + "ON DUPLICATE KEY UPDATE agile_story_agile_system_user_id='" + aStoryAgileSystemUserId + "', agile_story_id='" + aStoryId + "',agile_system_user_id='" + aSystemUserId + "',agile_system_user_story_points='" + aSystemUserStoryPoints + "'")
    statementExecuted = "True"
    return statementExecuted

# finds data to populate drop downs in edit/add modals for data management
@app.route("/findDropDownData/<table_name>")
def findDropDownData(table_name):
    # print("Paramater: " + table_name)
    if table_name == "work_team":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT work_team_id, work_team_name from work_team;')
        for row in cur.fetchall():
            addObject['work_team_id'] = row[0]
            addObject['work_team_name'] = row[1]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1
    elif table_name == "work_team_member":
        jsonList = []
        addObjectTeam = {}
        addObjectUser = {}
        iTeam=0
        iUser=0
        jsonListTeam = []
        jsonListUser = []
        sqlTeam = 'SELECT work_team_id, work_team_name FROM work_team;'
        sqlUser = 'SELECT work_user_id, firstname, lastname FROM work_user;'
        cur.execute(sqlTeam)
        for row in cur.fetchall():
            addObjectTeam['work_team_id'] = row[0]
            addObjectTeam['work_team_name'] = row[1]
            jsonListTeam.insert(iTeam, addObjectTeam)
            addObjectTeam = {}
            iTeam=iTeam+1
        jsonList.insert(0, jsonListTeam)
        cur.execute(sqlUser)
        for row in cur.fetchall():
            addObjectUser['work_user_id'] = row[0]
            addObjectUser['name'] = row[1] + ' ' + row[2]
            jsonListUser.insert(iUser, addObjectUser)
            addObjectUser = {}
            iUser= iUser+1
        jsonList.insert(1, jsonListUser)
    elif table_name == "work_dailyhours":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT work_team_id, work_team_name from work_team;')
        for row in cur.fetchall():
            addObject['work_team_id'] = row[0]
            addObject['work_team_name'] = row[1]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1
    elif table_name == "agile_system":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT work_team_id, work_team_name from work_team;')
        for row in cur.fetchall():
            addObject['work_team_id'] = row[0]
            addObject['work_team_name'] = row[1]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1
    elif table_name == "agile_system_user":
        # jsonList = []
        # addObjectSystem = {}
        # addObjectMember = {}
        # addObjectUser = {}
        # iSystem=0
        # iMember=0
        # iUser=0
        # jsonListSystem = []
        # jsonListMember = []
        # jsonListUser = []
        # sqlSystem = 'SELECT agile_system_id, agile_system_name FROM agile_system;'
        # sqlMember = 'SELECT work_team_member_id, firstname, lastname FROM work_team_member A INNER JOIN work_user B ON A.work_user_id = B.work_user_id;'
        # sqlUser = 'SELECT work_user_id, firstname, lastname FROM work_user;'
        # cur.execute(sqlSystem)
        # for row in cur.fetchall():
        #     addObjectSystem['agile_system_id'] = row[0]
        #     addObjectSystem['agile_system_name'] = row[1]
        #     jsonListSystem.insert(iSystem, addObjectSystem)
        #     addObjectSystem = {}
        #     iSystem=iSystem+1
        # jsonList.insert(0, jsonListSystem)
        # print(jsonList)
        # cur.execute(sqlMember)
        # for row in cur.fetchall():
        #     addObjectMember['work_team_member_id'] = row[0]
        #     addObjectMember['name'] = row[1] + ' ' + row[2]
        #     jsonListMember.insert(iMember, addObjectMember)
        #     addObjectMember = {}
        #     iMember=iMember+1
        # jsonList.insert(1, jsonListMember)
        # print(jsonList)
        # cur.execute(sqlUser)
        # for row in cur.fetchall():
        #     addObjectUser['work_user_id'] = row[0]
        #     addObjectUser['name'] = row[1] + ' ' + row[2]
        #     jsonListUser.insert(iUser, addObjectUser)
        #     addObjectUser = {}
        #     iUser=iUser+1
        # jsonList.insert(1, jsonListUser)
        # print(jsonList)
        jsonList = []
        addObjectSystem = {}
        iSystem=0
        cur.execute('SELECT agile_system_id, agile_system_name FROM agile_system;')
        for row in cur.fetchall():
            addObjectSystem['agile_system_id'] = row[0]
            addObjectSystem['agile_system_name'] = row[1]
            jsonList.insert(iSystem, addObjectSystem)
            addObjectSystem = {}
            iSystem=iSystem+1
    elif table_name == "agile_sprint":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT agile_system_id , agile_system_name FROM agile_system;')
        for row in cur.fetchall():
            addObject['agile_system_id'] = row[0]
            addObject['agile_system_name'] = row[1]
            jsonList.insert(i, addObject)
            addObject = {}
            i= i +1
    elif table_name == "agile_story":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT agile_sprint_id, agile_sprint_name FROM agile_sprint;')
        for row in cur.fetchall():
            addObject['agile_sprint_id'] = row[0]
            addObject['agile_sprint_name'] = row[1]
            jsonList.insert(i, addObject)
            addObject = {}
            i= i + 1
    elif table_name == "agile_story_agile_system_user":
        jsonList = []
        addObjectStory = {}
        addObjectSystem = {}
        iStory=0
        iSystem=0
        jsonListStory = []
        jsonListSystem = []
        sqlStory = 'SELECT agile_story_id, agile_story_name FROM agile_story;'
        sqlSystem = 'SELECT agile_system_user_id, agile_system_user_name FROM agile_system_user;'
        cur.execute(sqlStory)
        for row in cur.fetchall():
            addObjectStory['agile_story_id'] = row[0]
            addObjectStory['agile_story_name'] = row[1]
            jsonListStory.insert(iStory, addObjectStory)
            addObjectStory = {}
            iStory=iStory+1
        jsonList.insert(0, jsonListStory)
        cur.execute(sqlSystem)
        for row in cur.fetchall():
            addObjectSystem['agile_system_user_id'] = row[0]
            addObjectSystem['agile_system_user_name'] = row[1]
            jsonListSystem.insert(iSystem, addObjectSystem)
            addObjectSystem = {}
            iSystem=iSystem+1
        jsonList.insert(1, jsonListSystem)
    return json.dumps(jsonList)

if __name__ == "__main__":
    app.run()