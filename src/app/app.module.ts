import { Component, NgModule, enableProdMode } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MetricsComponent } from './metrics/metrics.component';
import { LineupComponent } from './lineup/lineup.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { DataComponent } from './data/data.component';
import { DemoComponent } from './demo/demo.component';
import { Injectable, Inject } from'@angular/core';
import { Observable } from'rxjs/Observable';
import { HttpClient } from'@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MetricsService } from './services/metrics.service';
import 'rxjs/add/operator/map';
import { SignInComponent } from './sign-in/sign-in.component';
import { DataService } from './services/data.service';
import {MatInputModule} from '@angular/material';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {DxButtonModule, DxLoadPanelModule, DxDataGridModule, DxPieChartModule  } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoadingPanelComponent } from './loading-panel/loading-panel.component';
import { TeamComponent } from './team/team.component';
import{
  DxCheckBoxModule,
  DxSelectBoxModule,
  DxNumberBoxModule,
  DxFormModule,
  DxTextBoxModule,
  DxTemplateModule
} from'devextreme-angular';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    HeaderComponent,
    MetricsComponent,
    LineupComponent,
    ViewScoreComponent,
    ScorecardComponent,
    DataComponent,
    DemoComponent,
    LoadingPanelComponent,
    SignInComponent,
    TeamComponent,

    
    
  ],

  imports: [
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxTemplateModule,
    ChartsModule,
    MatRadioModule,
    MatInputModule,
    MatTableModule,
    DxDataGridModule,
    MatSelectModule,
    DxButtonModule,
    DxPieChartModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomePageComponent },
      { path: "scorecard", component: ScorecardComponent },
      { path: "data", component: DataComponent },
      { path: "lineup", component: LineupComponent },
      { path: "metrics", component: MetricsComponent },
      { path: "demo", component: DemoComponent },
      { path: "view-score", component: ViewScoreComponent },
      { path: "team", component: TeamComponent },
      { path: "**", redirectTo: "home" }

    ]),
    BrowserModule,
    HttpModule,
    FormsModule,
    DxLoadPanelModule
  ],

  providers: [MetricsService, DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }



