import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
    DemoComponent
    
  ],

  imports: [
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatRadioModule,
    MatTableModule,
    MatSelectModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomePageComponent },
      { path: "scorecard", component: ScorecardComponent },
      { path: "data", component: DataComponent },
      { path: "lineup", component: LineupComponent },
      { path: "metrics", component: MetricsComponent },
      { path: "demo", component: DemoComponent },
      { path: "view-score", component: ViewScoreComponent },
      { path: "**", redirectTo: "home" }

    ]),
    BrowserModule,
    HttpModule,
    FormsModule
  ],

  providers: [MetricsService],
  bootstrap: [AppComponent]
})

export class AppModule { }



