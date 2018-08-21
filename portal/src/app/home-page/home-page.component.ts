import { Component, Inject, OnInit } from '@angular/core'
import { MetricsService } from '../services/metrics.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

	 title = 'POST Request'
	 username: string
	 password: string
	 results = []
	 metricsService: any

	 constructor (@Inject(MetricsService) metricsService) {
	  this.metricsService = metricsService
	 }

	 ngOnInit () {
		 this.results = []
	 }
}
