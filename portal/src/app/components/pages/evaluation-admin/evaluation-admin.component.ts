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
  currentEvaluation
  popupTitle

  popupVisible: boolean = false
  metricsService: any
  evaluationModeSave: boolean
  presenterDropDownReadOnly: boolean
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
        let n = results.length !== 0 ? results.length : 1
        for (let score of results) {
          total += score.totalScore
        }
        total = +((total / n).toFixed(2))
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

  // getCurrentPresenter ($event) {
  //   for (let u of this.userList) {
  //     if (u.workUserId === $event.value.workUserId) {
  //       this.currentPresenter = u
  //     }
  //   }
  // }

  addEvaluation () {
    this.evaluationModeSave = true
    this.presenterDropDownReadOnly = false
    this.stageDropDownValue = null
    this.presenterDropDownValue = null
    this.popupTitle = 'Create New Evaluation'
    this.popupVisible = true
  }

  onRowClick (e) {
    console.log('Click')
    let component = e.component
    let prevClickTime = component.lastClickTime
    component.lastClickTime = new Date()
    if (prevClickTime && (component.lastClickTime - prevClickTime < 300)) {
      console.log('Double Click')
      this.evaluationModeSave = false
      this.presenterDropDownReadOnly = true
      this.currentEvaluation = e.data.agileEvaluationId
      this.presenterDropDownValue = e.data.presenterUserId.workUserId
      this.stageDropDownValue = e.data.agileStage.agileStageId
      this.popupTitle = 'Edit Evaluation'
      this.popupVisible = true
    }
  }

  updateEvaluation () {
    this.metricsService.showLoadingPanel()
    let agileEvaluation = {
      'agileEvaluationsId': this.currentEvaluation,
      'agileStage': this.stageDropDownValue,
      // 'agileEvaluationSession': this.teamValue,
      'presenterUserId': this.currentPresenter,
      'lastUpdatedBy': this.metricsService.currentUser[0].workUserId,
      'lastUpdatedDate': new Date(),
      'agileEvaluationDate': new Date()
    }
    this.metricsService.update('AgileEvaluations', agileEvaluation.agileEvaluationsId, agileEvaluation)
      .subscribe((results) => {
        console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
        this.metricsService.hideLoadingPanel()
        this.clearPopup()
        this.getEvaluations()
      })
  }

  saveEvaluation () {
    this.metricsService.showLoadingPanel()
    console.log(`Current User === ${JSON.stringify(this.metricsService.currentUser)}`)

    let agileEvaluation = {
      'agileStage': this.stageDropDownValue,
      // 'agileEvaluationSession': this.teamValue,
      'presenterUserId': this.presenterDropDownValue,
      'createdBy': this.metricsService.currentUser[0].workUserId,
      'lastUpdatedBy': this.metricsService.currentUser[0].workUserId,
      'lastUpdatedDate': new Date(),
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
    let shouldSave = this.evaluationModeSave
    if (this.presenterDropDownValue !== undefined && this.stageDropDownValue !== undefined) {
      const result = confirm('Are you sure you want to save Evaluation?', 'Confirm changes')
      result.then(function (dialogResult) {
        if (dialogResult && shouldSave) {
          console.log('Save Eval')
          that.saveEvaluation()
          console.log('Saved evaluation session successfully')
        } else if (dialogResult && !shouldSave) {
          console.log('Update Eval')
          that.updateEvaluation()
          console.log('Updated evaluation session successfully')
        }
      })
    } else {
      notify('All fields must have a value!', 'error', 600)
    }
  }

  determineEvaluation (evaluationResult) {
    let selectedData = this.dataGrid.instance.getSelectedRowsData()
    if (selectedData.length > 0) {
      let that = this
      let evalText = evaluationResult > 0 ? "pass" : "fail"
      let confirmText = selectedData.length > 1 ? "these evaluations" : "this evaluation"
      const result = confirm(`Are you sure you want to ${evalText} ${confirmText}?`, 'Confirm changes')
      result.then(function (dialogResult) {
        if(dialogResult) {
          for (let row of selectedData) {
            that.metricsService.getAll('AgileEvaluations', '', `agileEvaluationsId=${row.agileEvaluationId}`)
            .subscribe((results) => {
              results[0].passed = evaluationResult
              that.metricsService.update('AgileEvaluations', results[0].agileEvaluationsId, results[0])
              .subscribe((results) => {
                console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
                that.metricsService.hideLoadingPanel()
                that.getEvaluations()
              })
            })
          }
        }
      })
    }
  }

  clearPopup () {
    this.presenterDropDownValue = undefined
    this.stageDropDownValue = undefined
    this.popupVisible = false
  }

}
