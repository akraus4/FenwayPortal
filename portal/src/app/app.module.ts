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
import { DxButtonModule, DxCheckBoxModule, DxTextAreaModule, DxDataGridModule, DxRadioGroupModule, DxRadioGroupComponent, DxDropDownBoxModule, DxFormModule, DxListModule, DxLoadPanelModule, DxNumberBoxModule, DxPieChartModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule } from 'devextreme-angular'
import { ChartsModule } from 'ng2-charts'
import { ModalModule } from 'ngx-bootstrap/modal'
import 'rxjs/add/operator/map'
import { AgileTeamComponent } from './components/pages/agile-team/agile-team.component'
import { AppComponent } from './app.component'
import { FooterComponent } from './components/widgets/footer/footer.component'
import { HeaderComponent } from './components/widgets/header/header.component'
import { HomePageComponent } from './components/pages/home-page/home-page.component'
import { LoadingPanelComponent } from './components/widgets/loading-panel/loading-panel.component'
import { MetricsComponent } from './components/pages/metrics/metrics.component'
import { NavBarComponent } from './components/widgets/nav-bar/nav-bar.component'
import { ScorecardComponent } from './components/pages/scorecard/scorecard.component'
import { AuthInterceptor } from './services/auth-interceptor.interceptor'
import { MetricsService } from './services/metrics.service'
import { ViewScoreComponent } from './components/pages/view-score/view-score.component'
import { LabsComponent } from './components/pages/labs/labs.component'
import { EvaluationComponent } from './components/pages/evaluation/evaluation.component'
import { EvaluationAdminComponent } from './components/pages/evaluation-admin/evaluation-admin.component'
import { EvaluationManagementComponent } from './components/pages/evaluation-management/evaluation-management.component'
import { AngularFontAwesomeModule } from 'angular-font-awesome'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomePageComponent,
    HeaderComponent,
    MetricsComponent,
    ViewScoreComponent,
    ScorecardComponent,
    LoadingPanelComponent,
    FooterComponent,
    AgileTeamComponent,
    LabsComponent,
    EvaluationComponent,
    EvaluationAdminComponent,
    EvaluationManagementComponent
  ],

  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
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
    DxTextAreaModule,
    DxButtonModule,
    DxPieChartModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    DxRadioGroupModule,
    // DxRadioGroupComponent,
    DxNumberBoxModule,
    DxFormModule,
    DxTextBoxModule,
    DxPopupModule,
    DxTemplateModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'lab', component: LabsComponent },
      { path: 'agile-team', component: AgileTeamComponent },
      { path: 'scorecard', component: ScorecardComponent },
      { path: 'metrics', component: MetricsComponent },
      { path: 'view-score', component: ViewScoreComponent },
      { path: 'evaluation', component: EvaluationComponent },
      { path: 'evaluationManagement', component: EvaluationManagementComponent },
      { path: 'evaluationAdmin', component: EvaluationAdminComponent },
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
