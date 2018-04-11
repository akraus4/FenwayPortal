import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MetricsService } from '../services/metrics.service';



@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {

  title = 'POST Request'
  TeamChoices = [];
  metricsService: any;
  SprintChoices = [];
  StoryChoices = [];
  constructor(@Inject(MetricsService) metricsService) {
    this.metricsService = metricsService;
  }

  ngOnInit() {
    // document.getElementById('barGraphMetricsPageDiv').style.display = 'block';
    // document.getElementById('gridGraphMetricsPageDiv').style.display = 'none';

    document.getElementById('gridGraphMetricsPageDiv').style.display = 'block';
    document.getElementById('barGraphMetricsPageDiv').style.display = 'none';
    this.getAllTeams();
    // this.getAllSprints();

  };

  getAllTeams() {
    this.metricsService.getAllTeams()
      .map(res => { console.log(); return res.json(); })
      .subscribe((results) => this.TeamChoices = results);
  }

 
  getAllSprintsByTeam(system_id) {
    console.log(system_id);
    this.metricsService.getAllSprintsBySystem(system_id)
      .map(res => { console.log(res); return res.json(); })
      .subscribe((results) => this.SprintChoices = results);
  }

  getAllStoriesBySprint(sprint_id) {
    console.log("Sprint ID = " + sprint_id);
    this.metricsService.getAllStoriesBySprint(sprint_id)
      .map(res => { console.log(res); return res.json(); })
      .subscribe((results) => this.StoryChoices = results);
  }


  showBarGraph() {
    document.getElementById('barGraphMetricsPageDiv').style.display = 'block';
    document.getElementById('gridGraphMetricsPageDiv').style.display = 'none';

  }
  showGridGraph() {
    document.getElementById('barGraphMetricsPageDiv').style.display = 'none';
    document.getElementById('gridGraphMetricsPageDiv').style.display = 'block';

  }

  //This is the array for the team selection.
  Team = new FormControl();
  // TeamChoices = this.allTeams;
  //This is the array for select from.
  Sprint = new FormControl();

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  /** */
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }
  displayedColumns = ['agile_story_id', 'agile_story_name', 'agile_sprint_id', 'story_type', 'story_points'];
  dataSource = this.StoryChoices;
}
export interface Element {
  agile_story_id: string;
  agile_story_name: string;
  agile_sprint_id: string;
  story_type: string;
  story_points: string;
}
// const ELEMENT_DATA: Element[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
//   { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
//   { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
//   { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
//   { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
//   { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
//   { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
//   { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
//   { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
//   { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
//   { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
// ];


