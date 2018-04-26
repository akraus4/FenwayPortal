import { Component, OnInit } from '@angular/core';
import { DxLoadPanelModule } from 'devextreme-angular';
import { MetricsService } from '../services/metrics.service';

@Component({
  selector: 'app-loading-panel',
  templateUrl: './loading-panel.component.html',
  styleUrls: ['./loading-panel.component.css']
})
export class LoadingPanelComponent implements OnInit {
  // metricsService: any;

  loadingVisible: boolean;
  

  constructor(private   metricsService:  MetricsService) {
    // this.metricsService = metricsService;
   
  }

  ngOnInit() {
    this.metricsService.loadingVisible.subscribe(
      (loadIndicator) => this.loadingVisible = loadIndicator
  );
  }


  
}
