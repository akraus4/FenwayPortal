import { Component, OnInit, Inject } from '@angular/core'
import { MetricsService } from '../services/metrics.service'

@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styleUrls: ['./loading-panel.component.css']
})
export class LoadingPanelComponent implements OnInit {

  metricsService: any
  loadingVisible: boolean

  constructor (@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService
  }

  ngOnInit () {
    this.metricsService.loadingVisible.subscribe(
      (loadIndicator) => this.loadingVisible = loadIndicator
    )
  }

}
