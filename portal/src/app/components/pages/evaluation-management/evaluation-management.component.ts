import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MetricsService } from '../../../services/metrics.service'
import { DxDataGridComponent } from 'devextreme-angular'

@Component({
  selector: 'app-evaluation-management',
  templateUrl: './evaluation-management.component.html',
  styleUrls: ['./evaluation-management.component.css']
})
export class EvaluationManagementComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
  associateChoices: any
  metricsService: any
  users = []
  evaluations = []
  scores = []
  userList: any[]
  evaluationList: any[]
  scoreList: any[]
  commentArray: string[]

  technicalTitle: string = 'test'
  behavioralTitle: string
  communicationTitle: string
  metricsTitle: string
  overallCommentTitle: string
  failureReasonTitle: string

  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
    this.getAllUsers()
  }

  getAllUsers () {
    this.metricsService.getAll('WorkUsers', '', 'active=1')
      .subscribe((results) => {
        for (let user of results) {
          let u = {
            'workUserId': user.workUserId,
            'fullname': user.firstname + ' ' + user.lastname
          }
          this.users.push(u)
        }
        this.userList = results
      })
  }

  getAllEvaluationsByUser ($event) {
    console.log('user ==== ' + $event.value.workUserId)
    this.metricsService.getAll('AgileEvaluations', 'agileStage,presenterUserId', `presenterUserId=${$event.value.workUserId}`)
      .subscribe((results) => {
        this.scoreList = []
        for (let evaluation of results) {
          let e = {
            'agileEvaluationsId': evaluation.agileEvaluationsId,
            'agileStage': evaluation.agileStage,
            'presenterUserId': evaluation.presenterUserId,
            'agileEvaluationDate': evaluation.agileEvaluationDate,
            'passed': evaluation.passed
          }
          this.evaluations.push(e)
        }
        this.evaluationList = results
      })
  }

  getAllEvaluationScoresByUser (e) {
    let component = e.component
    let prevClickTime = component.lastClickTime
    component.lastClickTime = new Date()
    let selectedData = this.dataGrid.instance.getSelectedRowsData()

    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      this.metricsService.getAll('AgileEvaluationScores', 'agileEvaluation,appraiserUserId', `agileEvaluation=${e.key.agileEvaluationsId}`)
        .subscribe((results) => {
          for (let score of results) {
            let s = {
              'appraiserUserId': score.appraiserUserId,
              'technicalScore': score.technicalScore,
              'technicalComment': score.technicalComment,
              'communicationScore': score.communicationScore,
              'communicationComment': score.communicationComment,
              'behavioralScore': score.behavioralScore,
              'behavioralComment': score.behavioralComment,
              'metricScore': score.metricScore,
              'metricComment': score.metricComment,
              'totalScore': score.totalScore,
              'overallComment': score.overallComment,
              'additionalComment': score.additionalComment,
              'failureReasonComment': score.failureReasonComment,
              'passed': score.passed
            }
            s.appraiserUserId.fullname = score.appraiserUserId.firstname + ' ' + score.appraiserUserId.lastname
            this.technicalTitle = s.technicalComment
            this.behavioralTitle = s.behavioralComment
            this.communicationTitle = s.communicationComment
            this.metricsTitle = s.metricComment
            this.overallCommentTitle = s.overallComment
            this.failureReasonTitle = s.failureReasonComment

            this.scores.push(s)
          }
          this.scoreList = results
        })
    }
  }

  onAssociateChange ($event) {
    this.getAllEvaluationsByUser($event)
  }
}