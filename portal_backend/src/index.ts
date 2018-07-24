import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import { AgileSprint } from './entities/agile_sprint'
import { AgileStoryAgileSystemUser } from './entities/agile_story_agile_system_user'
import { AgileStory } from './entities/agile_story'
import { AgileSystemUser } from './entities/agile_system_user'
import { AgileSystem } from './entities/agile_system'
import { WorkDailyHours } from './entities/work_dailyhours'
import { WorkTeamMember } from './entities/work_team_member'
import { WorkTeam } from './entities/work_team'
import { WorkUser } from './entities/work_user'

const config = require('../ormconfig.json')

/**
 * Controllers (route handlers).
 */
import * as wUserController from './controllers/work_user-controller'
import * as aSystemController from './controllers/agile_system-controller'
import * as workTeamController from './controllers/work-team-controller'

/**
 * Create Express server.
 */
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000)

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})

/**
 * Primary app routes.
 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

// Routes for agile_systems
// Index
app.get('/AgileSystems', aSystemController.getAllAgileSystems)
// Create
app.put('/AgileSystems', aSystemController.createAgileSystem)
// Read
app.get('/AgileSystems/:systemId', aSystemController.getAgileSystem)
// Update
app.post('/AgileSystems/:systemId', aSystemController.updateAgileSystem)
// Delete
app.delete('/AgileSystems/:systemId', aSystemController.deleteAgileSystem)

// app.get('/saveSystem/:system', aSystemController.saveSystem)
// app.get('/updateSystem/:system', aSystemController.updateSystem)
// app.get("/getAllSystemUsersBySystem/:systemId", aSystemController.getAllSystemUsersBySystem);

app.get('/GetAllWorkUsers', wUserController.getAllWorkUsers)
app.get('/getAllWorkTeams', aSystemController.getAllWorkTeams)
app.get(
  '/getAllSprintsBySystem/:systemId',
  aSystemController.getAllSprintsBySystem
)
app.get(
  '/getAllStoriesWithUsersBySprint/:sprintId',
  aSystemController.getAllStoriesWithUsersBySprint
)
app.get(
  '/getAllTeamMembersByTeam/:teamId',
  aSystemController.getAllTeamMembersByTeam
)
app.get(
  '/getAllSystemUsersBySystem/:systemId',
  aSystemController.getAllSystemUsersBySystem
)

/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'fg_user',
  password: 'fg_user',
  database: 'PORTAL',
  entities: [
    __dirname + '/entity/*.ts',
    WorkUser,
    AgileSystem,
    WorkTeam,
    AgileSprint,
    AgileStory,
    WorkTeamMember,
    AgileSystemUser
  ],
  synchronize: true,
  logging: false
})
  .then(async connection => {
    console.log('Connected to Database')
  })
  .catch(error => console.log(error))
