import { Injectable, Inject } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs/Subject'
// import { config } from './Config/config'

@Injectable()
export class EvaluationService {

  presenterDropDownValue
  appraiserDropDownValue
  stageDropDownValue
  techScoreValue: number = 0
  techCommentValue: String
  communicationScoreValue: number = 0
  communicationCommentValue: String
  behavioralScoreValue: number = 0
  behavioralCommentValue: String
  metricScoreValue: number = 0
  metricCommentValue: String
  overallCommentValue: String
  additionalCommentValue: String
  passedValue: number
  failureCommentValue: String

  constructor (public http: HttpClient) {
  }

}
