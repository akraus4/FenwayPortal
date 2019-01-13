import { Component, Inject } from '@angular/core'
import { MetricsService } from './services/metrics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  metricsService: any

  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
    this.getCurrentUser()
  }

  getCurrentUser () {
    const currentUser = localStorage.getItem('userEmail')
    let condition = `email=${currentUser}`
    this.metricsService.getAll('WorkUsers', '', condition)
      .subscribe((results) => {
        this.metricsService.currentUser.next(results)
        console.log(`Current User === ${JSON.stringify(results)}`)
      })
  }

}
