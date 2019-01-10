import { Component, OnInit, Inject, ViewChild } from '@angular/core'
import { MetricsService } from '../../../services/metrics.service'
import notify from 'devextreme/ui/notify'
import { confirm } from 'devextreme/ui/dialog'
import { DxDataGridComponent } from 'devextreme-angular'

@Component({
  selector: 'app-evaluation-admin',
  templateUrl: './evaluation-admin.component.html',
  styleUrls: ['./evaluation-admin.component.css']
})
export class EvaluationAdminComponent {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent
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
    this.averageScores = []
    this.metricsService.getNullEvaluations()
    .subscribe((results) => {
      for (let evaluation of results) {
        this.getEvaluationScores(evaluation)
      }
      console.log('Null Evaluations ===== ' + JSON.stringify(results))
    })
  }

  getEvaluationScores (evaluation) {
    console.log(JSON.stringify(evaluation))
    let condition = `agileEvaluation=${evaluation.agileEvaluationsId}`
    this.metricsService.getAll('AgileEvaluationScores', 'agileEvaluation,appraiserUserId', condition)
      .subscribe((results) => {
        // console.log(results)
        let total = 0
        for (let score of results) {
          total += score.totalScore
        }
        total = Math.round(total / results.length)
        let s = {
          agileEvaluationId: evaluation.agileEvaluationsId,
          presenterUserId: evaluation.presenterUserId,
          agileStage: evaluation.agileStage,
          agileEvaluationDate: evaluation.agileEvaluationDate,
          avgTotal: total
        }
        this.averageScores.push(s)
        // console.log('Stages ===== ' + JSON.stringify(this.averageScores))
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
          // console.log('USERS ===== ' + JSON.stringify(u))
          this.users.push(u)
        }
        this.userList = results
        this.presenterList = this.users
        // console.log('Presenters ===== ' + JSON.stringify(this.presenterList))
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

  addEvaluation () {
    console.log('Click')
    this.popupVisible = true
  }

  saveEvaluation () {
    this.metricsService.showLoadingPanel()
    let agileEvaluation = {
      'agileStage': this.stageDropDownValue,
      // 'agileEvaluationSession': this.teamValue,
      'presenterUserId': this.currentPresenter,
      'agileEvaluationDate': new Date()
    }
    this.metricsService.save('AgileEvaluations', agileEvaluation)
      .subscribe((results) => {
        console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
        this.metricsService.hideLoadingPanel()
        this.clearPopup()
        this.getEvaluations()
      })
  }

  submitClick () {
    // Create Pop-Up Dialog
    let that = this
    if (this.presenterDropDownValue !== undefined && this.stageDropDownValue !== undefined) {
      const result = confirm('Are you sure you want to save Evaluation?', 'Confirm changes')
      result.then(function (dialogResult) {
        if (dialogResult) {
          that.saveEvaluation()
          console.log('Mission Complete')
        }
      })
    } else {
      notify('All fields must have a value!', 'error', 600)
    }
  }

  determineEvaluation (evaluationResult) {
    let selectedData = this.dataGrid.instance.getSelectedRowsData()
    for (let row of selectedData) {
      this.metricsService.getAll('AgileEvaluations', '', `agileEvaluationsId=${row.agileEvaluationId}`)
      .subscribe((results) => {
        results[0].passed = evaluationResult
        this.metricsService.update('AgileEvaluations', results[0].agileEvaluationsId, results[0])
        .subscribe((results) => {
          console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
          this.metricsService.hideLoadingPanel()
          this.getEvaluations()
        })
      })
    }
  }

  clearPopup () {
    this.presenterDropDownValue = undefined
    this.stageDropDownValue = undefined
    this.popupVisible = false
  }

}
