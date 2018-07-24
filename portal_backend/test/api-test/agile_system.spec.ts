import * as chai from 'chai'
import * as mocha from 'mocha'
import * as request from 'request-promise'

const expect = chai.expect
// Configuration of port and version would be a plus
// const baseUrl = `http://localhost:${localConfig.api.port}/${localConfig.api.version}/`
const baseUrl = `http://localhost:3000/`

let options = {
  method: '',
  uri: '',
  headers: {
    // Having authorization would protect the service
    //    'Authorization': `Bearer ${bearerToken}`
  },
  body: {},
  json: true,
  resolveWithFullResponse: true
}

// Test index of all agile systems
describe('Calling Route (/AgileSystems)', function () {
  before(async () => {
    // server = await startApiServer(village)
  })
  describe('GET Request', () => {
    before(() => {
      options.method = 'GET'
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}AgileSystems`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test create an agile system
describe('Calling Route (/AgileSystems)', function () {
  before(async () => {
    // server = await startApiServer(village)
  })
  describe('PUT Request with ID', () => {
    before(() => {
      options.method = 'PUT',
      options.body = {
        agile_system_name: 'TEST1',
        agile_system_type: 'TRELLO',
        work_team_id: '',
        active: true
      }
    })
    it('should return a success status', () => {
      let systemId = 100
      options.uri = `${baseUrl}AgileSystems/`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test update an agile system
describe('Calling Route (/AgileSystems/:systemId)', function () {
  before(async () => {
    // server = await startApiServer(village)
  })
  describe('POST Request with ID', () => {
    before(() => {
      options.method = 'POST',
      options.body = {
        agile_system_name: 'TEST1',
        agile_system_type: 'TRELLO',
        work_team_id: '',
        active: true
      }
    })
    it('should return a success status', () => {
      let systemId = 100
      options.uri = `${baseUrl}AgileSystems/${systemId}`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})
