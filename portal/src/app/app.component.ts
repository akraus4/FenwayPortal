import { Component, Inject } from '@angular/core'
import { MetricsService } from './services/metrics.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  metricsService: any

  constructor (@Inject(MetricsService) metricsService, private router: Router) {
    this.metricsService = metricsService
    this.getCurrentUser()
    // Routes app to home page when browser refreshes.
    this.router.navigate([''])
  }

  getCurrentUser () {
    const currentUser = localStorage.getItem('userEmail')
    let condition = `email=${currentUser}`
    this.metricsService.getAll('WorkUsers', '', condition)
      .subscribe((results) => {
        this.metricsService.currentUser = results
        // console.log(`Current User === ${JSON.stringify(this.metricsService.currentUser)}`)
      })
  }

}
