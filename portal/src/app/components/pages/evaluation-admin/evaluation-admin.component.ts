import { Component, OnInit, Inject } from '@angular/core'
import { MetricsService } from '../../../services/metrics.service'

@Component({
  selector: 'app-evaluation-admin',
  templateUrl: './evaluation-admin.component.html',
  styleUrls: ['./evaluation-admin.component.css']
})
export class EvaluationAdminComponent {
  averageScores: any
  metricsService: any
  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
  }

  getEvaluations () {
    this.metricsService.getAll('AgileEvaluations', 'agileStage,presenterUserId', 'passed=null')
    .subscribe((results) => {
      for (let evaluation of results) {
        this.getEvaluationScores(evaluation)
      }
      // this.stageList = results
      // console.log('Stages ===== ' + JSON.stringify(this.stageList))
    })
  }

  getEvaluationScores (evaluation) {
    this.metricsService.getAll('AgileEvaluationScores', 'agileEvaluation,appraiserUserId', 'agileEvaluation=evaluation.agileEvaluationId')
      .subscribe((results) => {
        let i = 0
        let total = 0
        for (let score of results) {
          i++
          total = score.totalScore
          if (i === results.length) {
            total = total / i
            let s = {
              agileEvaluationId: evaluation.agileEvaluationId,
              presenterUserId: evaluation.presenterUserId,
              agileStage: evaluation.agileStage,
              agileEvaluationDate: evaluation.agileEvaluationDate,
              avgTotal: total
            }
            this.averageScores.push(s)
          }
        }
        // this.stageList = results
        console.log('Stages ===== ' + JSON.stringify(this.averageScores))
      })
  }

}
