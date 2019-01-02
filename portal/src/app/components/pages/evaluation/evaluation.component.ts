import { Component, OnInit, Inject } from '@angular/core'
import * as $ from 'jquery'
import { MetricsService } from '../../../services/metrics.service'

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  metricsService: any
  ratings: number[]
  passConfirmationList: string[]
  passConfirmationValue: string
  total: number = 0
  stageList: any[]
  pressenterList: any[]
  appraiserList: any[]
  userList: any[]
  currentPressenter
  currentAppraiser
  users: any[] = []

  presenterDropDownValue
  appraiserDropDownValue
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

  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
    this.getAllStages()
    this.getAllUsers()
    this.ratings = [1, 2, 3, 4, 5]
    this.passConfirmationList = ['Yes (Total of 14 - 20pts from above)', 'No (Total of 0 - 13pts from above)']
  }

  ngOnInit () {
    $('#ifNoLbl').addClass('remove')
    $('#ifNoTxtfld').addClass('remove')
  }

  onValueChangedStage ($event) {
    if ($event.value === 'Appentice') {
      this.technicalTitle = '- An Apprentice is undergoing instruction beyond the Novice Stage where an Associate is introduced and exposed to technologies and methodology. <br> - An Apprentice is familiar and proficient in the use of technologies and methodology <br> - Inquisitively immerses herself/himself into the assigned domain <br> - Associate successfully applies required skills as determined by scope of services per engagement under the direction of a mentor'
      this.behavioralTitle = '- An Apprentice experiments on their own. <br> - An Apprentice shows respect for other employees. <br> - An Apprentice volunteers for engagement  activities. <br> - An Apprentice is reliable and dependable. <br> - An Apprentice displays strong communication with their Coach and among their peers. <br> - An Apprentice proactively offers support to other pod members.'
      // this.communicationTitle = 'test'
      // this.metricsTitle = 'test'
    } else if ($event.value === 'Practitioner') {
      this.technicalTitle = '- A Practitioner applies acquired skill on real-world engagements but needs regular reviews by a Coach. '
      this.behavioralTitle = '- A Practitioner consistently  displays attributes of a team player as determined, noted and confirmed by a Coach and the Coaches request of other pod members regarding the Practitioner. <br> - A Practitioner applies problem solving capabilities with confidence observed, noted and confirmed by a Coach and peers.'
      // this.communicationTitle = 'test'
      // this.metricsTitle = 'test'
    } else if ($event.value === 'Journeyman') {
      this.behavioralTitle = '- A Journeyman performs tasks unsupervised. <br> - A Journeyman is self-sufficient, more often the source of advice than the recipient. <br> - A Journeyman actively provides guidance to Associates in preceding stages, and other pods. '
      this.technicalTitle = '- A Journeyman uses techniques naturally and automatically with minimal guidance '
      // this.communicationTitle = 'test'
      // this.metricsTitle = 'test'
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
    this.populateYesNo()
  }

  populateYesNo () {
    if (this.total < 14) {
      this.passConfirmationValue = this.passConfirmationList[1]
    } else {
      this.passConfirmationValue = this.passConfirmationList[0]
    }
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

  getCurrentPresenter ($event) {
    for (let u of this.userList) {
      if (u.workUserId === $event.value.workUserId) {
        this.currentPressenter = u
      }
    }
  }

  saveEvaluation () {
    this.metricsService.showLoadingPanel()
    let agileEvaluation = {
      'agileStage': this.stageDropDownValue,
      // 'agileEvaluationSession': this.teamValue,
      'presenterUserId': this.currentPressenter,
      'agileEvaluationDate': new Date()
    }
    this.metricsService.save('AgileEvaluations', agileEvaluation)
      .subscribe((results) => {
        console.log('Evaluation Save Result ===== ' + JSON.stringify(results))
        this.saveEvaluationScore(results)
        this.metricsService.hideLoadingPanel()
      })
  }

  saveEvaluationScore (evaluation) {
    this.metricsService.showLoadingPanel()
    let passed: number
    if (this.passConfirmationValue === 'Yes (Total of 14 - 20pts from above)') {
      passed = 1
    } else if (this.passConfirmationValue === 'No (Total of 0 - 13pts from above)') {
      passed = 0
    }
    let agileEvaluationScore = {
      'agileEvaluation': evaluation,
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
      'passed': passed
    }
    this.metricsService.save('AgileEvaluationScores', agileEvaluationScore)
      .subscribe((results) => {
        this.metricsService.hideLoadingPanel()
      })
  }

  submitClick () {
    console.log('_______CLICK_______')
    this.saveEvaluation()
  }

}
