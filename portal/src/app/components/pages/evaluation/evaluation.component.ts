import { AgileEvaluations } from './../../../../../../portal_backend/src/entities/agile_evaluations'
import { Component, OnInit, Inject } from '@angular/core'
import * as $ from 'jquery'
import { MetricsService } from '../../../services/metrics.service'
import { EvaluationService } from '../../../services/evaluation.service'
import notify from 'devextreme/ui/notify'
import { confirm } from 'devextreme/ui/dialog'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  metricsService: any
  evaluationService: any
  ratings: number[]
  passConfirmationList: string[]
  passConfirmationValue: string
  total: number = 0
  stageList: any[]
  pressenterList: any[]
  appraiserList: any[]
  userList: any[]
  users: any[] = []
  evaluationList: any[]

  evaluationDropDownValue
  appraiserDropDownValue
  currentPressenter
  currentAppraiser
  stageDropDownValue
  technicalCommentValue
  communicationCommentValue
  behavioralCommentValue
  metricsCommentValue
  overallCommentValue
  additionalCommentValue
  failureReasonCommentValue

  technicalTitle: string = 'Technical'
  behavioralTitle: string = 'Behavioral'
  communicationTitle: string = 'Communication'
  metricsTitle: string = 'Metrics'

  currentTechnicalValue: number = 0
  currentCommunicationValue: number = 0
  currentBehavioralValue: number = 0
  currentMetricValue: number = 0

  currentTechnicalValueSet: number = 0
  currentCommunicationValueSet: number = 0
  currentBehavioralValueSet: number = 0
  currentMetricValueSet: number = 0

  currentRatedValueArray: number[]
  commentValueArray: string[]
  evaluationDetailsArray: any[]

  constructor (@Inject(MetricsService) metricsService, @Inject(EvaluationService) evaluationService) {
    this.metricsService = metricsService
    this.evaluationService = evaluationService
    this.getAllStages()
    try {
      this.currentAppraiser = this.metricsService.currentUser[0]
      this.appraiserDropDownValue = this.metricsService.currentUser[0].workUserId
    } catch (e) {
      console.log(e)
    }
    this.getEvaluations()
    this.getAllUsers()
    this.ratings = [1, 2, 3, 4, 5]
    this.passConfirmationList = ['Yes (Total of 14 - 20pts from above)', 'No (Total of 0 - 13pts from above)']
  }

  ngOnInit () {
    $('#ifNoLbl').addClass('remove')
    $('#ifNoTxtfld').addClass('remove')
    this.populateEvaluation()
  }

  // onValueChangedStage ($event) {
  //   if ($event.value === 'Appentice') {
  //     this.technicalTitle = '- An Apprentice is undergoing instruction beyond the Novice Stage where an Associate is introduced and exposed to technologies and methodology. <br> - An Apprentice is familiar and proficient in the use of technologies and methodology <br> - Inquisitively immerses herself/himself into the assigned domain <br> - Associate successfully applies required skills as determined by scope of services per engagement under the direction of a mentor'
  //     this.behavioralTitle = '- An Apprentice experiments on their own. <br> - An Apprentice shows respect for other employees. <br> - An Apprentice volunteers for engagement  activities. <br> - An Apprentice is reliable and dependable. <br> - An Apprentice displays strong communication with their Coach and among their peers. <br> - An Apprentice proactively offers support to other pod members.'
  //     // this.communicationTitle = 'test'
  //     // this.metricsTitle = 'test'
  //   } else if ($event.value === 'Practitioner') {
  //     this.technicalTitle = '- A Practitioner applies acquired skill on real-world engagements but needs regular reviews by a Coach. '
  //     this.behavioralTitle = '- A Practitioner consistently  displays attributes of a team player as determined, noted and confirmed by a Coach and the Coaches request of other pod members regarding the Practitioner. <br> - A Practitioner applies problem solving capabilities with confidence observed, noted and confirmed by a Coach and peers.'
  //     // this.communicationTitle = 'test'
  //     // this.metricsTitle = 'test'
  //   } else if ($event.value === 'Journeyman') {
  //     this.behavioralTitle = '- A Journeyman performs tasks unsupervised. <br> - A Journeyman is self-sufficient, more often the source of advice than the recipient. <br> - A Journeyman actively provides guidance to Associates in preceding stages, and other pods. '
  //     this.technicalTitle = '- A Journeyman uses techniques naturally and automatically with minimal guidance '
  //     // this.communicationTitle = 'test'
  //     // this.metricsTitle = 'test'
  //   }
  // }
  populateEvaluation () {
    this.currentTechnicalValueSet = this.evaluationService.techScoreValue
    this.currentTechnicalValue = this.evaluationService.techScoreValue
    this.technicalCommentValue = this.evaluationService.techCommentValue
    this.currentCommunicationValueSet = this.evaluationService.communicationScoreValue
    this.currentCommunicationValue = this.evaluationService.communicationScoreValue
    this.communicationCommentValue = this.evaluationService.communicationCommentValue
    this.currentBehavioralValueSet = this.evaluationService.behavioralScoreValue
    this.currentBehavioralValue = this.evaluationService.behavioralScoreValue
    this.behavioralCommentValue = this.evaluationService.behavioralCommentValue
    this.currentMetricValueSet = this.evaluationService.metricScoreValue
    this.currentMetricValue = this.evaluationService.metricScoreValue
    this.metricsCommentValue = this.evaluationService.metricCommentValue
    this.overallCommentValue = this.evaluationService.overallCommentValue
    this.additionalCommentValue = this.evaluationService.additionalCommentValue
    this.failureReasonCommentValue = this.evaluationService.failureCommentValue
    this.passConfirmationValue = this.evaluationService.passedValue
    this.total = this.evaluationService.techScoreValue + this.evaluationService.communicationScoreValue + this.evaluationService.behavioralScoreValue + this.evaluationService.metricScoreValue
    if (this.passConfirmationValue === 'No (Total of 0 - 13pts from above)') {
      $('#ifNoLbl').removeClass('remove')
      $('#ifNoTxtfld').removeClass('remove')
    } else {
      $('#ifNoLbl').addClass('remove')
      $('#ifNoTxtfld').addClass('remove')
    }
  }

  onValueChangedYesNo ($event) {
    if ($event.value === 'No (Total of 0 - 13pts from above)') {
      $('#ifNoLbl').removeClass('remove')
      $('#ifNoTxtfld').removeClass('remove')
    } else {
      $('#ifNoLbl').addClass('remove')
      $('#ifNoTxtfld').addClass('remove')
    }
  }

  onValueChangedTechical ($event) {
    if (this.currentTechnicalValue === 0) {
      this.currentTechnicalValue = $event.value
      this.total = this.total + this.currentTechnicalValue
    } else {
      this.total = (this.total - this.currentTechnicalValue) + $event.value
      this.currentTechnicalValue = $event.value
    }
    this.evaluationService.techScoreValue = this.currentTechnicalValue
    this.populateYesNo()
  }

  onValueChangedCommunication ($event) {
    if (this.currentCommunicationValue === 0) {
      this.currentCommunicationValue = $event.value
      this.total = this.total + this.currentCommunicationValue
    } else {
      this.total = (this.total - this.currentCommunicationValue) + $event.value
      this.currentCommunicationValue = $event.value
    }
    this.evaluationService.communicationScoreValue = this.currentCommunicationValue
    this.populateYesNo()
  }

  onValueChangedBehavioral ($event) {
    if (this.currentBehavioralValue === 0) {
      this.currentBehavioralValue = $event.value
      this.total = this.total + this.currentBehavioralValue
    } else {
      this.total = (this.total - this.currentBehavioralValue) + $event.value
      this.currentBehavioralValue = $event.value
    }
    this.evaluationService.behavioralScoreValue = this.currentBehavioralValue
    this.populateYesNo()
  }

  onValueChangedMetrics ($event) {
    if (this.currentMetricValue === 0) {
      this.currentMetricValue = $event.value
      this.total = this.total + this.currentMetricValue
    } else {
      this.total = (this.total - this.currentMetricValue) + $event.value
      this.currentMetricValue = $event.value
    }
    this.evaluationService.metricScoreValue = this.currentMetricValue
    this.populateYesNo()
  }

  onValueChangedTechComment ($event) {
    this.evaluationService.techCommentValue = this.technicalCommentValue
  }

  onValueChangedCommunicationComment ($event) {
    this.evaluationService.communicationCommentValue = this.communicationCommentValue
  }

  onValueChangedBehavioralComment ($event) {
    this.evaluationService.behavioralCommentValue = this.behavioralCommentValue
  }

  onValueChangedMetricComment ($event) {
    this.evaluationService.metricCommentValue = this.metricsCommentValue
  }

  onValueChangedOverallComment ($event) {
    this.evaluationService.overallCommentValue = this.overallCommentValue
  }

  onValueChangedAdditionalComment ($event) {
    this.evaluationService.additionalCommentValue = this.additionalCommentValue
  }

  onValueChangedFailureComment ($event) {
    this.evaluationService.failureCommentValue = this.failureReasonCommentValue
  }

  onValueChangedPassed ($event) {
    this.evaluationService.passedValue = this.passConfirmationValue
  }

  populateYesNo () {
    if (this.total < 14 && this.total > 0) {
      this.passConfirmationValue = this.passConfirmationList[1]
    } else if (this.total > 13) {
      this.passConfirmationValue = this.passConfirmationList[0]
    }
    this.evaluationService.passedValue = this.passConfirmationValue
  }

  getEvaluations () {
    this.metricsService.getNullEvaluations()
      .subscribe((results) => {
        let evaluation = []
        for (let evalu of results) {
          let e = {
            'agileEvaluationsId': evalu.agileEvaluationsId,
            'agileStage': evalu.agileStage,
            'presenterUserId': evalu.presenterUserId,
            'agileEvaluationDate': evalu.agileEvaluationDate,
            'fullname': evalu.presenterUserId.firstname + ' ' + evalu.presenterUserId.lastname
          }
          // console.log('USERS ===== ' + JSON.stringify(e))
          evaluation.push(e)
        }
        this.evaluationList = evaluation
        console.log('Null Evaluations ===== ' + JSON.stringify(results))
      })
  }

  setCurrentStage ($event) {
    console.log('Selected Evaluation Stage ===== ' + JSON.stringify($event.value.agileStage))
    this.stageDropDownValue = $event.value.agileStage.agileStageId
    this.technicalTitle = $event.value.agileStage.agileStageTechnicalRrequirements
    this.behavioralTitle = $event.value.agileStage.agileStageBehavioralRrequirements
    console.log('Stage Drop Down Value ===== ' + JSON.stringify(this.stageDropDownValue))
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
        this.pressenterList = this.users
        this.appraiserList = this.users
        console.log('Presenters ===== ' + JSON.stringify(this.pressenterList))
        console.log('Apraisers ===== ' + JSON.stringify(this.appraiserList))
      })
  }

  getAllStages () {
    this.metricsService.getAll('AgileStages', '', '')
      .subscribe((results) => {
        this.stageList = results
        console.log('Stages ===== ' + JSON.stringify(this.stageList))
      })
  }

  getCurrentAppraiser ($event) {
    for (let u of this.userList) {
      if (u.workUserId === $event.value.workUserId) {
        this.currentAppraiser = u
      }
    }
  }

//  getCurrentPresenter ($event) {
//    for (let u of this.userList) {
//      if (u.workUserId === $event.value.workUserId) {
//        this.currentPressenter = u
//      }
//    }
//  }

//  saveEvaluation () {
//    this.metricsService.showLoadingPanel()
//    let agileEvaluation = {
//      'agileStage': this.stageDropDownValue,
//      // 'agileEvaluationSession': this.teamValue,
//      'presenterUserId': this.evaluationDropDownValue,
//      'agileEvaluationDate': new Date()
//    }
//    this.metricsService.save('AgileEvaluations', agileEvaluation)
//      .subscribe((results) => {
//        console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
//        this.saveEvaluationScore(results)
//        this.metricsService.hideLoadingPanel()
//        this.clearAll()
//      })
//  }

  saveEvaluationScore () {
    try {
      this.metricsService.showLoadingPanel()
      let passed: number
      if (this.passConfirmationValue === 'Yes (Total of 14 - 20pts)') {
        passed = 1
      } else if (this.passConfirmationValue === 'No (Total of 4 - 13pts)') {
        passed = 0
      }
      console.log('Evaluation Id Save Result ===== ' + JSON.stringify(this.evaluationDropDownValue))
      let agileEvaluationScore = {
        'agileEvaluation': this.evaluationDropDownValue,
        'appraiserUserId': this.currentAppraiser,
        'technicalScore': this.currentTechnicalValue,
        'technicalComment': this.technicalCommentValue,
        'communicationScore': this.currentCommunicationValue,
        'communicationComment': this.communicationCommentValue,
        'behavioralScore': this.currentBehavioralValue,
        'behavioralComment': this.behavioralCommentValue,
        'metricScore': this.currentMetricValue,
        'metricComment': this.metricsCommentValue,
        'totalScore': this.total,
        'overallComment': this.overallCommentValue,
        'additionalComment': this.additionalCommentValue,
        'failureReasonComment': this.failureReasonCommentValue,
        'agileEvaluationScoreDate': new Date(),
        'passed': passed
      }
      this.metricsService.save('AgileEvaluationScores', agileEvaluationScore)
        .subscribe((results) => {
          this.metricsService.hideLoadingPanel()
          this.clearAll()
        })
    } catch (e) {
      this.metricsService.hideLoadingPanel()
      console.log(e)
    }
  }

  clearAll () {
    this.currentTechnicalValue = 0
    this.currentCommunicationValue = 0
    this.currentBehavioralValue = 0
    this.currentMetricValue = 0
    this.currentTechnicalValueSet = 0
    this.currentCommunicationValueSet = 0
    this.currentBehavioralValueSet = 0
    this.currentMetricValueSet = 0
    this.total = 0
    this.evaluationDropDownValue = undefined
    this.currentPressenter = undefined
    this.stageDropDownValue = undefined
    this.technicalCommentValue = ''
    this.communicationCommentValue = ''
    this.behavioralCommentValue = ''
    this.metricsCommentValue = ''
    this.overallCommentValue = ''
    this.failureReasonCommentValue = ''
    this.additionalCommentValue = ''
    this.passConfirmationValue = undefined

    // this.evaluationService.presenterDropDownValue
    // this.evaluationService.appraiserDropDownValue
    // this.evaluationService.stageDropDownValue
    this.evaluationService.techScoreValue = 0
    this.evaluationService.techCommentValue = ''
    this.evaluationService.communicationScoreValue = 0
    this.evaluationService.communicationCommentValue = ''
    this.evaluationService.behavioralScoreValue = 0
    this.evaluationService.behavioralCommentValue = ''
    this.evaluationService.metricScoreValue = 0
    this.evaluationService.metricCommentValue = ''
    this.evaluationService.overallCommentValue = ''
    this.evaluationService.additionalCommentValue = ''
    this.evaluationService.passedValue = 0
    this.evaluationService.failureCommentValue = ''
  }

  constructScoreArray () {
    this.currentRatedValueArray = [this.currentTechnicalValue, this.currentCommunicationValue, this.currentBehavioralValue, this.currentMetricValue]
  }

  constructCommentArray () {
    this.commentValueArray = [this.technicalCommentValue, this.communicationCommentValue, this.behavioralCommentValue, this.metricsCommentValue, this.overallCommentValue]
  }

  constructEvaluationDetailsArray () {
    this.evaluationDetailsArray = [this.evaluationDropDownValue, this.currentAppraiser]
  }

  submitClick () {
    // Confirm Completetion of the Form
    let formcompletion = false
    this.constructScoreArray()
    this.constructCommentArray()
    this.constructEvaluationDetailsArray()
    let scored = true
    let comments = true
    this.currentRatedValueArray.forEach(element => {
      if (element === 0 || element === undefined) {
        scored = false
        // break
      }
    })
    this.commentValueArray.forEach(element => {
      if (element === '' || element === undefined || element === null || /^\s*$/.test(element)) {
        comments = false
        // break
      }
    })
    this.evaluationDetailsArray.forEach(element => {
      if (element === undefined || element == null) {
        comments = false
      // break
      }
    })
    if (this.passConfirmationValue.includes('No') && (this.failureReasonCommentValue === '' || this.failureReasonCommentValue === undefined || this.failureReasonCommentValue === null || /^\s*$/.test(this.failureReasonCommentValue))) {
      comments = false
    }
    if (scored && comments) {
      formcompletion = true
    }

    console.log(this.currentAppraiser)
    // Create Pop-Up Dialog
    let that = this
    if (formcompletion) {
      const result = confirm('Are you sure you want to save this scorecard?', 'Confirm changes')
      result.then(function (dialogResult) {
        if (dialogResult) {
          that.saveEvaluationScore()
          console.log('Mission Complete')
        }
      })
    } else {
      notify('All fields must have a value!', 'error', 600)
    }
  }

}
