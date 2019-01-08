import 'reflect-metadata'
import { createConnection, ConnectionOptions } from 'typeorm'
import * as express from 'express'
import * as bodyParser from 'body-parser'

let request = require('request')

/**
 * Controllers (route handlers).
 */
import * as controller from './controllers/controller'
import * as cors from 'cors'

let fs = require('fs')
let jwt = require('express-jwt')

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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.use(function (req, res, next) {
//   console.log(req.headers)
//   next()
// })

// let publicKey = fs.readFileSync('public.pub')
let getPublicKeys = () => {
  return new Promise((resolve, reject) => {
    request.get('https://www.googleapis.com/oauth2/v1/certs', function (error, response, body) {
      if (!error && response.statusCode === 200) {
        resolve(JSON.parse(body))
      }
      reject(Error('Could not retrieve google public keys'))
    })
  })
}

let publicKeys = {}
getPublicKeys().then(result => {
  publicKeys = result
}).catch(err => {
  console.log(`Failed to fetch keys ${err}`)
})

app.use(jwt({
  secret: (req, header, payload, done) => {
    let key = publicKeys[header.kid]
    // If we do not have the key pull a fresh set
    if (!key) {
      getPublicKeys().then(result => {
        publicKeys = result
        key = publicKeys[header.kid]
      }).catch(err => {
        console.log(`Failed to fetch keys ${err}`)
      })
    }
    done(null, key)
  }
}))

// Example middleware that logs user
app.use(function (req, res, next) {
  console.log(`User Name = ${req.user.name}`)
  next()
})

// Handle response for invalid JWT
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
// Getting evaulations that have a null pass value
app.get('/api/:entityType', controller.getNullEvaluations)

/**
 * Create connection to DB using configuration provided in
 * ormconfig.json file.
 */

createConnection()
  .then(async connection => {
    console.log('Connected to Database')
  })
  .catch(error => console.log(error))
