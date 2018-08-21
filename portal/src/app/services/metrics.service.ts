import { Injectable, Inject } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class MetricsService {

  developmentURL = 'http://localhost:3000'
  productionURL = ''
  url = this.developmentURL
  loadingVisible = new BehaviorSubject<boolean>(false)

  constructor (public http: HttpClient) {
  }

  getAll (entity, relations, conditions) {
    console.log(`URL ====  ${this.url}/api/${entity}?relations=${relations}&conditions=${conditions}`)
    let result = this.http.get(`${this.url}/api/${entity}?relations=${relations}&conditions=${conditions}`)
    console.log(result)
    return result
  }

  save (entity, object) {
    console.log(`URL Post ====  ${this.url}/api/${entity}`)
    let body = JSON.stringify(object)
    let result = this.http.post(`${this.url}/api/${entity}`, body)
    return result
  }

  update (entity, id, object) {
    console.log(`URL Put ====  ${this.url}/api/${entity}/${id}`)
    let body = JSON.stringify(object)
    let result = this.http.put(`${this.url}/api/${entity}/${id}`, body)
    return result
  }

  getAllStoriesPointsByUser (sprintIds) {
    console.log('made it')
    let conditions = `agileSprint=[${sprintIds}]`
    console.log(`URL ====  ${this.url}/api/AgileStories?relations=agileStoryAgileSystemUsers,agileStoryAgileSystemUsers.agileSystemUser,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember.workUser,agileSprint&conditions=${conditions}`)
    let results = this.http.get(`${this.url}/api/AgileStories?relations=agileStoryAgileSystemUsers,agileStoryAgileSystemUsers.agileSystemUser,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember.workUser,agileSprint&conditions=${conditions}`)
    return results
  }

  showLoadingPanel (): void {
    this.loadingVisible.next(true)
  }

  hideLoadingPanel (): void {
    this.loadingVisible.next(false)
  }

}
