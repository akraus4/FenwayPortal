import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() number: number;
headername="";

  constructor() { }

  headers = ['View Metrics','View Scorecard','Set Lineup','New Scorecard','Schedule Demo','Load Data'];

  ngOnInit() {
    this.headername = this.headers[this.number];
  }

}
