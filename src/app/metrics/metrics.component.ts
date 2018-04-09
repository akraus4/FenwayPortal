import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  constructor(){}
  ngOnInit(){
    document.getElementById('barGraphMetricsPageDiv').style.display ='block';
    document.getElementById('gridGraphMetricsPageDiv').style.display ='none';

  };
  
  showBarGraph(){
    document.getElementById('barGraphMetricsPageDiv').style.display ='block';
    document.getElementById('gridGraphMetricsPageDiv').style.display ='none';

  }
  showGridGraph(){
    document.getElementById('barGraphMetricsPageDiv').style.display ='none';
    document.getElementById('gridGraphMetricsPageDiv').style.display ='block';

  }

  //This is the array for the team selection.
  Team = new FormControl();
  TeamChoices = ['Tuskan Raiders', 'Han Solo & The Boys', 'Jedi', 'Sith', 'Rebel Forces', 'Anaken'];
  TeamOrMemberChoices = [
    {value: 'team-0', viewValue: 'Team'},
    {value: 'member-1', viewValue: 'Member'}
  ];
  //This is the array for select from.
  SprintsFromChoices = [
    {value: 'sprint-0', viewValue: 'Sprint 1'},
    {value: 'sprint-1', viewValue: 'Sprint 2'},
    {value: 'sprint-2', viewValue: 'Sprint 3'},
    {value: 'sprint-3', viewValue: 'Sprint 4'},
    {value: 'sprint-4', viewValue: 'Sprint 5'},
    {value: 'sprint-5', viewValue: 'Sprint 6'},
    {value: 'sprint-6', viewValue: 'Sprint 7'},
    {value: 'sprint-7', viewValue: 'Sprint 8'},
    {value: 'sprint-8', viewValue: 'Sprint 9'},
    {value: 'sprint-9', viewValue: 'Sprint 10'},
    {value: 'sprint-10', viewValue: 'Sprint 11'},
    {value: 'sprint-11', viewValue: 'Sprint 12'},
    {value: 'sprint-12', viewValue: 'Sprint 13'},
    {value: 'sprint-13', viewValue: 'Sprint 14'},
    {value: 'sprint-14', viewValue: 'Sprint 15'},
    {value: 'sprint-15', viewValue: 'Sprint 16'},
    {value: 'sprint-16', viewValue: 'Sprint 17'},
    {value: 'sprint-17', viewValue: 'Sprint 18'},
    {value: 'sprint-18', viewValue: 'Sprint 19'},
    {value: 'sprint-19', viewValue: 'Sprint 20'}
  ];
  //This is the array from select to.
  SprintsToChoices = [
    {value: 'sprint-0', viewValue: 'Sprint 1'},
    {value: 'sprint-1', viewValue: 'Sprint 2'},
    {value: 'sprint-2', viewValue: 'Sprint 3'},
    {value: 'sprint-3', viewValue: 'Sprint 4'},
    {value: 'sprint-4', viewValue: 'Sprint 5'},
    {value: 'sprint-5', viewValue: 'Sprint 6'},
    {value: 'sprint-6', viewValue: 'Sprint 7'},
    {value: 'sprint-7', viewValue: 'Sprint 8'},
    {value: 'sprint-8', viewValue: 'Sprint 9'},
    {value: 'sprint-9', viewValue: 'Sprint 10'},
    {value: 'sprint-10', viewValue: 'Sprint 11'},
    {value: 'sprint-11', viewValue: 'Sprint 12'},
    {value: 'sprint-12', viewValue: 'Sprint 13'},
    {value: 'sprint-13', viewValue: 'Sprint 14'},
    {value: 'sprint-14', viewValue: 'Sprint 15'},
    {value: 'sprint-15', viewValue: 'Sprint 16'},
    {value: 'sprint-16', viewValue: 'Sprint 17'},
    {value: 'sprint-17', viewValue: 'Sprint 18'},
    {value: 'sprint-18', viewValue: 'Sprint 19'},
    {value: 'sprint-19', viewValue: 'Sprint 20'}
  ];

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
   /** */
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  public randomize():void {
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
    displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

 
