import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from './services/data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  dataService: any;
  constructor(@Inject(DataService) dataService) {
    this.dataService = dataService;
    // this.columnChoices = this.columns;
  }

  ngOnInit() {
    this.getAllTeams()
  }

  getAllTeams() {
    this.dataService.getAllWorkTeams()
      .map(res => { return res.json(); })
      .subscribe((results) => { this.dataService.allTeams = results; console.log(this.dataService.allTeams) });
  }
}
