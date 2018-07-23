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

// describe('Calling Route (/GetAllEmployees)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

// describe('Calling Route (/GetAllWorkUsers)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

describe('Calling Route (/GetAllAgileSystems)', function () {
  before(async () => {
        // server = await startApiServer(village)
  })
  describe('GET', () => {
    before(() => {
      options.method = 'GET'
    })
    it('should return full response', () => {
      options.uri = `${baseUrl}GetAllAgileSystems`
      return request(options)
      .then(res => {
        expect(res.statusCode).to.equal(200)
      })
    })
  })
})

// describe('Calling Route (/GetAllWorkTeams)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

// describe('Calling Route (/GetAllSprintsBySystem)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

// describe('Calling Route (/GetAllStoriesWithUsersBySprint)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

// describe('Calling Route (/GetAllTeamMembersByTeam)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })

// describe('Calling Route (/GetAllSystemUsersBySystem)', function () {
//   before(async () => {
//         // server = await startApiServer(village)
//   })
//   describe('GET', () => {
//     before(() => {
//       options.method = 'GET'
//     })
//     it('should return full response', () => {
//       options.uri = `${baseUrl}GetAllEmployees`
//       return request(options)
//       .then(res => {
//         expect(res.statusCode).to.equal(200)
//       })
//     })
//   })
// })
