import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { MetricsService } from './services/metrics.service';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  signInVisible;

  constructor(public metricService: MetricsService) {

  }

  ngOnInit() {
    this.metricService.signInVisible.subscribe(
      (signInIndicator) => this.signInVisible = signInIndicator
    );
    // this.metricService.showSignInPanel();
  }

}