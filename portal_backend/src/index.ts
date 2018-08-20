import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import * as express from 'express'

import * as bodyParser from 'body-parser'

const ormConfig = require('../ormconfig.json')
const config = require('./config/config')

/**
 * Controllers (route handlers).
 */
// import * as wUserController from './controllers/work_user-controller'
// import * as aSystemController from './controllers/agile_system-controller'
import * as controller from './controllers/controller'

import * as cors from 'cors'

let fs = require('fs')

let jwt = require('express-jwt')

// const RSA_PUBLIC_KEY = fs.readFileSync(config.rsaPublicKeyPath)

// const checkIfAuthenticated = jwt({
//     secret: RSA_PUBLIC_KEY,
//     requestProperty: 'auth'
// })

/**
 * Create Express server.
 */
const app = express()

// Set and use CORS
// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:4200',
  preflightContinue: false
}
// use cors middleware
app.use(cors(options))
// enable pre-flight
app.options('*', cors(options))

// /**
//  * Primary app routes.
//  */
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept', 'Authorization'
//   )
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   next()
// })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(checkIfAuthenticated)

app.use(function (req, res, next) {
  console.log(req.headers)
  next()
})

let publicKey = fs.readFileSync('public.pub')
app.use(jwt({ secret: publicKey }))
app.use(function (req, res, next) {
  console.log('Can do stuff with JWT here')
  console.log(`User Name = ${req.user.name}`)
  next()
})

// Handle invalid JWT
// app.use(function(err, req, res, next) {
//   if (err.constructor.name === 'UnauthorizedError') {
//       res.status(401).send(`invalid token...  ${err}`);
//   }
// });

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

// Routes for entity CRUD
// Index
app.get('/api/:entityType', controller.getAll)
// Create
app.post('/api/:entityType', controller.save)
// Read
app.get('/api/:entityType/:id', controller.get)
// Update
app.put('/api/:entityType/:id', controller.update)
// Delete
app.delete('/api/:entityType/:id', controller.remove)

// app.get("/getAllSystemUsersBySystem/:systemId", aSystemController.getAllSystemUsersBySystem);

// app.get('/api/GetAllWorkUsers', wUserController.getAllWorkUsers)
// app.get('/api/getAllWorkTeams', aSystemController.getAllWorkTeams)
// app.get(
//   '/api/getAllSprintsBySystem/:systemId',
//   aSystemController.getAllSprintsBySystem
// )
// app.get(
//   '/api/getAllStoriesWithUsersBySprint/:sprintId',
//   aSystemController.getAllStoriesWithUsersBySprint
// )
// app.get(
//   '/api/getAllTeamMembersByTeam/:teamId',
//   aSystemController.getAllTeamMembersByTeam
// )
// app.get(
//   '/api/getAllSystemUsersBySystem/:systemId',
//   aSystemController.getAllSystemUsersBySystem
// )

/**
 * Create connection to DB using configuration provided in
 * appconfig file.
 */
createConnection({
  type: 'mysql',
  host: '52.55.14.143',
  port: 3306,
  username: 'fg_user_dev2',
  password: '6UhjVvAgM_Jm',
  database: 'fg_metrics_dev2',
  entities: [
    __dirname + '/entities/*.ts'
  ],
  synchronize: false,
  logging: false
})
  .then(async connection => {
    console.log('Connected to Database')
  })
  .catch(error => console.log(error))
