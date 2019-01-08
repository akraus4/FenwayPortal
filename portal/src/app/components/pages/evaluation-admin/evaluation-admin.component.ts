import { Component, OnInit, Inject } from '@angular/core'
import { MetricsService } from '../../../services/metrics.service'

@Component({
  selector: 'app-evaluation-admin',
  templateUrl: './evaluation-admin.component.html',
  styleUrls: ['./evaluation-admin.component.css']
})
export class EvaluationAdminComponent {
  averageScores: any[] = []
  presenterList: any[]
  stageList: any[]
  userList: any[]
  users: any[] = []

  presenterDropDownValue
  stageDropDownValue
  currentPresenter

  popupVisible: boolean = false
  metricsService: any
  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
    this.getAllStages()
    this.getAllUsers()
    this.getEvaluations()
  }

  getEvaluations () {
    this.metricsService.getNullEvaluations('AgileEvaluations')
    .subscribe((results) => {
      for (let evaluation of results) {
        this.getEvaluationScores(evaluation)
      }
      //console.log('Stages ===== ' + JSON.stringify(results))
    })
  }

  getEvaluationScores (evaluation) {
    console.log(JSON.stringify(evaluation))
    let condition = `agileEvalutation=${evaluation.agileEvaluationsId}`
    this.metricsService.getAll('AgileEvaluationScores', 'agileEvaluation,appraiserUserId', condition)
      .subscribe((results) => {
        //console.log(results)
        let total = 0
        for (let score of results) {
          total += score.totalScore
        }
        total = total / results.length
        let s = {
          agileEvaluationId: evaluation.agileEvaluationsId,
          presenterUserId: evaluation.presenterUserId,
          agileStage: evaluation.agileStage,
          agileEvaluationDate: evaluation.agileEvaluationDate,
          avgTotal: total
        }
        this.averageScores.push(s)
        //console.log('Stages ===== ' + JSON.stringify(this.averageScores))
      })
  }

  getAllUsers () {
    this.metricsService.getAll('WorkUsers', '', 'active=1')
      .subscribe((results) => {
        for (let user of results) {
          let u = {
            'workUserId': user.workUserId,
            'fullname': user.firstname + ' ' + user.lastname
          }
          console.log('USERS ===== ' + JSON.stringify(u))
          this.users.push(u)
        }
        this.userList = results
        this.presenterList = this.users
        console.log('Presenters ===== ' + JSON.stringify(this.presenterList))
      })
  }

  getAllStages () {
    this.metricsService.getAll('AgileStages', '', '')
      .subscribe((results) => {
        this.stageList = results
        console.log('Stages ===== ' + JSON.stringify(this.stageList))
      })
  }

  getCurrentPresenter ($event) {
    for (let u of this.userList) {
      if (u.workUserId === $event.value.workUserId) {
        this.currentPresenter = u
      }
    }
  }

  togglePopupVisible() {
    this.popupVisible = !this.popupVisible
    console.log("Found")
  }

}
