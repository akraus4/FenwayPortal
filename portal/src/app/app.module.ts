import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxListModule, DxLoadPanelModule, DxNumberBoxModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular'
import { ChartsModule } from 'ng2-charts'
import { ModalModule } from 'ngx-bootstrap/modal'
import 'rxjs/add/operator/map'
import { AgileTeamComponent } from './agile-team/agile-team.component'
import { AppComponent } from './app.component'
import { FooterComponent } from './footer/footer.component'
import { HeaderComponent } from './header/header.component'
import { HomePageComponent } from './home-page/home-page.component'
import { LineupComponent } from './lineup/lineup.component'
import { LoadingPanelComponent } from './loading-panel/loading-panel.component'
import { MetricsComponent } from './metrics/metrics.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { ScorecardComponent } from './scorecard/scorecard.component'
import { AuthInterceptor } from './services/auth-interceptor.interceptor'
import { MetricsService } from './services/metrics.service'
import { TeamComponent } from './team/team.component'
import { ViewScoreComponent } from './view-score/view-score.component'

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
    LoadingPanelComponent,
    TeamComponent,
    FooterComponent,
    AgileTeamComponent
  ],

  imports: [
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
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
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxNumberBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxPopupModule,
    DxTemplateModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'agile-team', component: AgileTeamComponent },
      { path: 'scorecard', component: ScorecardComponent },
      { path: 'lineup', component: LineupComponent },
      { path: 'metrics', component: MetricsComponent },
      { path: 'view-score', component: ViewScoreComponent },
      { path: 'team', component: TeamComponent },
      { path: '**', redirectTo: 'home' }

    ]),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    DxLoadPanelModule,
    DxDropDownBoxModule,
    DxListModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, MetricsService],
  bootstrap: [AppComponent]
})

export class AppModule { }
