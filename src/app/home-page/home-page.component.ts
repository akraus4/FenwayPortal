import { Component, Inject, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

	title = 'POST Request';
	username: string;
	password: string;
	results = [];
	metricsService: any;

	constructor(@Inject(MetricsService) metricsService) {
	  this.metricsService = metricsService;
	}

	ngOnInit() {
		this.results = [];
		
		// this.getUsers();
		
	}

	customers = [{
        ID: 1,
        CompanyName: "Super Mart of the West",
        City: "Bentonville",
        State: "Arkansas"
    }, {
        ID: 2,
        CompanyName: "Electronics Depot",
        City: "Atlanta",
        State: "Georgia"
    }];

	// getUsers() {
	//   this.metricsService.getUsers()
	//   .map(res => {console.log(); return res.json();  })
	// 	.subscribe((results) => this.results = results);
	// }

	// addUser(username, password) {
	// 	var data = {
	// 		username: username,
	// 		password: password
	// 	};

	//   var result = this.metricsService.addUser(data)
	//     .subscribe(res => {
	//     	if(res.success == "true") {
	//     		this.results.unshift(data);
	//     	}
	//       this.password = "";
	//       this.username = "";
	//       console.log(res);
	//     });
	// }
	
}