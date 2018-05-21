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
                    db="fg_metrics_dev2") # name of the database
                    # host= "52.55.14.143",
                    # user= "fg_user",
                    # passwd= "uXQ1pgjZlne7",
                    # db= "fg_metrics")  

# Create a Cursor object to execute queries.
cur = db.cursor()

#Create list of JSON objects for Select Team drop down in View Metrics Page
@app.route("/findAllTeams")
def findAllTeams():
    jsonList = []
    addObject = {}
    i=0

    cur.execute("SELECT * FROM agile_system ORDER BY agile_system_name ASC")
    
    for row in cur.fetchall():
     
        addObject['agile_system_id'] = row[0]
        addObject['agile_system_name'] = row[1]
        addObject['agile_system_type'] = row[2] 
        addObject['work_team_id'] = row[3]
        jsonList.insert(i, addObject)
        addObject = {}
        i=i+1

    return json.dumps(jsonList)

#Create list of JSON objects for Select sprint drop down in View Metrics Page
@app.route("/findAllSprintsBySystem/<system_id>")
def findAllSprintsBySystem(system_id):
    jsonList = []
    addObject = {}
    i=0
    cur.execute("SELECT * FROM agile_sprint WHERE agile_system_id = '" + system_id + "' ORDER BY agile_sprint_name ASC")

    for row in cur.fetchall():
        addObject['agile_sprint_id'] = row[0]
        addObject['agile_sprint_name'] = row[1]
        addObject['agile_system_id'] = row[2] 
        addObject['sprint_description'] = row[3]
        addObject['sprint_start_date'] = row[4]
        addObject['sprint_end_date'] = row[5]
        jsonList.insert(i, addObject)
        addObject = {}
        i=i+1

    return json.dumps(jsonList)

#Create list of JSON objects for table in View Metrics Page
@app.route("/findAllStoriesWithUsersBySprint/<sprint_id>")
def findAllStoriesWithUsersBySprint(sprint_id):
    jsonList = []
    addObject = {}
    i=0
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
        addObject['agiel_system_user_id'] = row[9]
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
        i=i+1

    return json.dumps(jsonList)

#Create list of JSON objects for table in Data Management Page
@app.route("/findTableData/<table_name>")
def findTableData(table_name):
    
    print("Paramater: " + table_name)


    if table_name == "work_user":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT * FROM work_user')
        for row in cur.fetchall():
            addObject['work_user_id'] = row[0]
            addObject['firstname'] = row[1]
            addObject['lastname'] = row[2] 
            addObject['email'] = row[3]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1

    elif table_name == "work_team":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT * FROM work_team')
        for row in cur.fetchall():
            addObject['work_team_id'] = row[0]
            addObject['work_team_name'] = row[1]
            addObject['project_id'] = row[2] 
            addObject['project_name'] = row[3]
            jsonList.insert(i, addObject)
            addObject = {}
            i=i+1
        
    elif table_name == "work_team_member":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('')
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
            i=i+1


    elif table_name == "work_dailyhours":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('')
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
            i=i+1


    elif table_name == "agile_system":
        jsonList = []
        addObject = {}
        i=0
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
            i=i+1

    elif table_name == "agile_system_user":
        jsonList = []
        addObject = {}
        i=0
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
            i=i+1

    elif table_name == "agile_sprint":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('')
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
            i=i+1

            

    elif table_name == "agile_story":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('SELECT * FROM agile_story LEFT OUTER JOIN agile_sprint ON agile_story.agile_sprint_id = agile_sprint.agile_sprint_id')
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
            i=i+1


    elif table_name == "agile_story_agile_system_user":
        jsonList = []
        addObject = {}
        i=0
        cur.execute('')
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
            i=i+1

    return json.dumps(jsonList)



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
