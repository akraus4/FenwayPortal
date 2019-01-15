// Usage: node ./rally.js [Teamname]
// Example: node ./rally.js CDMMS

const team = process.argv[2]
const config = require('./config/' + team + '.js')
const moment = require('moment')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const exportFile = moment().format('YYYYMMDD_HHmmss') + '_CTL_' + team + '.json'
const exec = require('child_process').exec

let startDate = moment().subtract(28, 'days').format()
let endDate = moment().add(14, 'days').format()

axios({
  method: 'get',
  url: `https://rally1.rallydev.com/slm/webservice/v2.0/iteration`,
  params: {
    apiKey: config.apiKey,
    fetch: 'Name,Notes,Owner,StartDate,EndDate',
    query: `(((Project.ObjectUUID = ${config.projectID}) and (StartDate >= ${startDate})) and (EndDate <= ${endDate}))`,
    pagesize: 200
  },
  headers: { 'zsessionid': config.apiKey }
}).then(async response => {
  if (response.data.QueryResult.Errors[0]) {
    console.error(response.data.QueryResult.Errors)
    process.exit()
  }

  let result = {
    team_id: config.team_id,
    system_id: config.projectID,
    sprint: []
  }

  for (let each in response.data.QueryResult.Results) {
    result.sprint.push(await buildResults(response.data.QueryResult.Results[each].Name))
  }

  // Write JSON results to result.json file
  fs.writeFile('C:/RallyStories/' + exportFile, JSON.stringify(result), function () {
    const child = exec('cmd /c C:/scripts/winscp.bat C:\\RallyStories\\' + exportFile, (error, stdout, stderr) => {
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)

      if (error != null) {
        console.error(`exec error: ${error}`)
      }
    })
  })
}).catch(error => {
  console.error(error.stack)
})

function buildResults (sprintName) {
  return new Promise(async (resolve, reject) => {
    // Build query to get tasks assigned to members of the team
    let query = '('

    for (let each in config.userList) {
      if (each == 0) {
        query = query + `(Owner.Name = ${config.userList[each]})`
      } else {
        query = '(' + query + `(Owner.Name = ${config.userList[each]}))`
      }

      if (each < config.userList.length - 1) {
        query = query + ' or '
      }
    }

    query = query + ` and (Iteration.Name = "${sprintName}"))`

    // Get tasks assigned to users for specified sprint and initialize arrays
    let userResult = await getUsers(query)
    let hashArr = []
    let defects = []
    let userStories = []

    // Iterate over user tasks to create a hash and arrays of defects and user stories tasks are associated with
    for (let each in userResult) {
      if (!hashArr[userResult[each].WorkProduct.FormattedID]) {
        hashArr[userResult[each].WorkProduct.FormattedID] = []
        hashArr[userResult[each].WorkProduct.FormattedID].push({
          Actuals: userResult[each].Actuals,
          User: userResult[each].Owner['_refObjectName'].toLowerCase().replace(' ', '.') + '@centurylink.com'
        })
      } else {
        let flag = true

        for (let i in hashArr[userResult[each].WorkProduct.FormattedID]) {
          if (userResult[each].Owner['_refObjectName'].toLowerCase().replace(' ', '.') + '@centurylink.com' === hashArr[userResult[each].WorkProduct.FormattedID][i].User) {
            hashArr[userResult[each].WorkProduct.FormattedID][i].Actuals += userResult[each].Actuals
            flag = false
            break
          }
        }

        if (flag) {
          hashArr[userResult[each].WorkProduct.FormattedID].push({
            Actuals: userResult[each].Actuals,
            User: userResult[each].Owner['_refObjectName'].toLowerCase().replace(' ', '.') + '@centurylink.com'
          })
        }
      }

      if (userResult[each].WorkProduct.FormattedID.indexOf('DE') > -1 && defects.indexOf(userResult[each].WorkProduct.FormattedID) === -1) {
        defects.push(userResult[each].WorkProduct.FormattedID)
      } else if (userResult[each].WorkProduct.FormattedID.indexOf('US') > -1 && userStories.indexOf(userResult[each].WorkProduct.FormattedID) === -1) {
        userStories.push(userResult[each].WorkProduct.FormattedID)
      }
    }

    // Initialize variables for next section
    let startDate = ''
    let endDate = ''
    let stories = []

    // Pull the defects from Rally, get the start and end dates, and generate the results
    if (defects[0]) {
      var defectList = await getDefects(defects)
      startDate = moment(defectList[0].Iteration.StartDate).format('YYYY-MM-DD')
      endDate = moment(defectList[0].Iteration.EndDate).format('YYYY-MM-DD')
      stories = stories.concat(generateResults(defectList, hashArr))
    }

    // Pull the user stories from Rally, get the start and end dates, and generate the results
    if (userStories[0]) {
      var userStoryList = await getUserStories(userStories)
      startDate = moment(userStoryList[0].Iteration.StartDate).format('YYYY-MM-DD')
      endDate = moment(userStoryList[0].Iteration.EndDate).format('YYYY-MM-DD')
      stories = stories.concat(generateResults(userStoryList, hashArr))
    }

    resolve({
      sprint_id: sprintName,
      sprint_start_date: startDate,
      sprint_end_date: endDate,
      stories: stories
    })
  })
}

// REST call to get the tasks assigned to the members of the team
function getUsers (query) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://rally1.rallydev.com/slm/webservice/v2.0/task`,
      params: {
        apiKey: config.apiKey,
        fetch: 'WorkProduct,Owner,Name,State,Estimate,Actuals',
        query: query,
        pagesize: 200
      },
      headers: { 'zsessionid': config.apiKey }
    }).then(response => {
      if (response.data.QueryResult.Errors[0]) {
        reject(response.data.QueryResult.Errors)
        process.exit()
      }

      resolve(response.data.QueryResult.Results)
    }).catch(error => {
      reject(error.stack)
    })
  })
}

// REST call to get the defects that have tasks assigned to the team
function getDefects (defects) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://rally1.rallydev.com/slm/webservice/v2.0/defects`,
      params: {
        apiKey: config.apiKey,
        fetch: 'FormattedID,ScheduleState,PlanEstimate,Iteration,StartDate,EndDate',
        query: generateQuery(defects),
        pagesize: 200
      },
      headers: { 'zsessionid': config.apiKey }
    }).then(response => {
      if (response.data.QueryResult.Errors[0]) {
        reject(response.data.QueryResult.Errors)
        process.exit()
      }

      resolve(response.data.QueryResult.Results)
    }).catch(error => {
      reject(error.stack)
    })
  })
}

// REST call to get the user stories that have tasks assigned to the team
function getUserStories (userStories) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `https://rally1.rallydev.com/slm/webservice/v2.0/hierarchicalrequirement`,
      params: {
        apiKey: config.apiKey,
        fetch: 'FormattedID,ScheduleState,PlanEstimate,Iteration,StartDate,EndDate',
        query: generateQuery(userStories),
        pagesize: 200
      },
      headers: { 'zsessionid': config.apiKey }
    }).then(response => {
      if (response.data.QueryResult.Errors[0]) {
        reject(response.data.QueryResult.Errors)
        process.exit()
      }

      resolve(response.data.QueryResult.Results)
    }).catch(error => {
      reject(error.stack)
    })
  })
}

// Generate the queries for defects and user stories
function generateQuery (arr) {
  query = '('

  for (let each in arr) {
    if (each == 0) {
      query = query + `(FormattedID = ${arr[each]})`
    } else {
      query = '(' + query + `(FormattedID = ${arr[each]}))`
    }

    if (each < arr.length - 1) {
      query = query + ' or '
    }
  }

  query = query + ' and ((ScheduleState = Completed) or (ScheduleState = Accepted)))'

  return query
}

// Generate and distribute points to the team
function generateResults (arr, hashArr) {
  let stories = []

  for (let i in arr) {
    let totalHours = 0
    let assignedTo = []

    for (let j in hashArr[arr[i].FormattedID]) {
      totalHours += hashArr[arr[i].FormattedID][j].Actuals
    }

    for (let j in hashArr[arr[i].FormattedID]) {
      let points = +(((hashArr[arr[i].FormattedID][j].Actuals / totalHours) * arr[i].PlanEstimate).toFixed(3)) || 0
      assignedTo.push({ user: hashArr[arr[i].FormattedID][j].User, user_points: points })
    }

    stories.push({
      story_id: arr[i].FormattedID,
      story_points: arr[i].PlanEstimate,
      assigned_to: assignedTo
    })
  }

  return stories
}
