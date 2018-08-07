import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class MetricsService {
	developmentURL = 'http://localhost:3000'
	productionURL = ''
	url = this.developmentURL
	http: any;
	loadingVisible = new BehaviorSubject<boolean>(false);

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	// getUsers() {
	// let result = this.http.get('http://localhost:3000/');console.log(JSON.stringify(result)); return result
	// }

	getAllSystems() {
		let result = this.http.get(this.url + '/getAllAgileSystems');
		return result
  }

  getAllWorkTeams() {
		let result = this.http.get(this.url + '/getAllWorkTeams');
		return result
	}

	getAllSprints() {
		let result = this.http.get(this.url + '/findAllSprints');
		return result
	}

	getAllSprintsBySystem(system_id) {
		let result = this.http.get(this.url + '/getAllSprintsBySystem/' + system_id);
		// console.log(JSON.stringify(result));
		return result
	}

	getAllStoriesWithUsersBySprint(sprint_id) {
		// var stories = [];
		// var num: number = 0;
		// var i: number;
		// var factorial = 1;
		// for (i = num; i < sprint_id.length; i++) {
		// 	console.log("sprint id = " + sprint_id[i].agile_sprint_id)
		// console.log('@@@@@@@@@@ ' + sprint_id.length )
			let result = this.http.get(this.url + '/findAllStoriesWithUsersBySprint/' + sprint_id);
			// console.log("result = " + result)
			// stories.push(result);
			// console.log(JSON.stringify(stories))
			// console.log(JSON.stringify(result));
			return result
	//	}
		// console.log(stories)
		// return stories;
	}

	getAllStoriesAndUsersBySprint(sprint_id, story_id) {
		let result = this.http.get(this.url + '/findAllStoriesAndUsersBySprint/' + sprint_id + story_id);
		return result
	}

	getAllSystemUsersBySystem(systemId) {
		let result = this.http.get(this.url + '/getAllSystemUsersBySystem/' + systemId);
		return result
	}

	// addUser(data) {
	// 	let headers = new Headers({"Content-Type": "application/json"});
	// 	let options = new RequestOptions({ headers: headers });
	// 	return this.http.post('http://localhost:3000/adduser', JSON.stringify(data), options)
	// 		.map(res => res.json());
	// }

	showLoadingPanel(): void {
        this.loadingVisible.next(true);
    }

    hideLoadingPanel(): void {
        this.loadingVisible.next(false);
    }
}
