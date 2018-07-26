import * as chai from 'chai'
import * as mocha from 'mocha'
import * as request from 'request-promise'

const expect = chai.expect
const baseUrl = `http://localhost:3000/`

// Id of system that will be generated and tested and removed
let systemId

// default options for request
let options = {
  method: '',
  uri: '',
  headers: {
    // Having authorization would protect the service
    //    'Authorization': `Bearer ${bearerToken}`
  },
  body: {},
  json: true,
  resolveWithFullResponse: true,
  timeout: 2500 // a little more than the 2000 for promise
}

// Test create an agile system
describe('Calling Route (api/AgileSystems)', function () {
  describe('PUT Request', () => {
    before(() => {
      options.method = 'PUT',
      options.body = {
        agileSystemName: 'TEST1',
        agileSystemType: 'TRELLO',
        workTeam: '100',
        active: true
      }
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}api/AgileSystems/`
      return request(options).then(res => {
        console.log(res.body.identifiers[0].agileSystemId)
        systemId = res.body.identifiers[0].agileSystemId
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test update an agile system
describe('Calling Route (api/AgileSystems/:systemId)', function () {
  describe('POST Request with ID', () => {
    before(() => {
      options.method = 'POST',
      options.body = {
        agileSystemName: 'TEST1',
        agileSystemType: 'TRELLO',
        workTeam: '100',
        active: true
      }
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}api/AgileSystems/${systemId}`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test index of all agile systems
describe('Calling Route (api/AgileSystems)', function () {
  describe('GET Request', () => {
    before(() => {
      options.method = 'GET'
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}api/AgileSystems?relations=workTeam`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test get an agile systems
describe('Calling Route (api/AgileSystems/:systemId)', function () {
  describe('GET Request', () => {
    before(() => {
      options.method = 'GET'
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}api/AgileSystems/${systemId}?relations=workTeam`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// Test delete an agile systems
describe('Calling Route (api/AgileSystems/:systemId)', function () {
  before(async () => {
    // server = await startApiServer(village)
  })
  describe('DELETE Request with ID', () => {
    before(() => {
      options.method = 'DELETE'
    })
    it('should return a success status', () => {
      options.uri = `${baseUrl}api/AgileSystems/${systemId}`
      return request(options).then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})
