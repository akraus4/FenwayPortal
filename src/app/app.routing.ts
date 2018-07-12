import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MetricsComponent } from './metrics/metrics.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { DataComponent } from './data/data.component';
import { LineupComponent } from './lineup/lineup.component';
import { DemoComponent } from './demo/demo.component';
import { ViewScoreComponent } from './view-score/view-score.component';
import { TeamComponent } from './team/team.component';
import { SignInComponent } from './sign-in/sign-in.component';


export  const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomePageComponent },
    { path: "scorecard", component: ScorecardComponent },
    { path: "data", component: DataComponent },
    { path: "lineup", component: LineupComponent },
    { path: "metrics", component: MetricsComponent },
    { path: "demo", component: DemoComponent },
    { path: "view-score", component: ViewScoreComponent },
    { path: "team", component: TeamComponent },
    { path: "signIn", component: SignInComponent},
    { path: "**", redirectTo: "home"}
  ];
  
  export  const routing: ModuleWithProviders = RouterModule.forRoot(routes);