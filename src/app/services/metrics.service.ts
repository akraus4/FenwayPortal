import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class MetricsService {

	http: any;

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	// getUsers() {
	// let result = this.http.get('http://localhost:3000/');console.log(JSON.stringify(result)); return result

	// }

	getAllTeams() {
		let result = this.http.get('http://localhost:3000/findAllTeams');
		console.log(JSON.stringify(result));
		return result

	}
	getAllSprints() {
		let result = this.http.get('http://localhost:3000/findAllSprints');
		console.log(JSON.stringify(result));
		return result

	}
	getAllSprintsBySystem(system_id) {
		// let headers = new Headers();
		// headers.append('Content-Type', 'application/json');
		// headers.append('system_id', system_id);
		// let params = new URLSearchParams();
		// params.append("system_id", system_id)
		// let result = this.http.get('http://localhost:3000/findAllSprintsBySystem', {headers: headers, search: params});
		let result = this.http.get('http://localhost:3000/findAllSprintsBySystem/' + system_id);
		// console.log(JSON.stringify(result));
		return result

	}

	getAllStoriesBySprint(sprint_id) {
		// let headers = new Headers();
		// headers.append('Content-Type', 'application/json');
		// headers.append('system_id', system_id);
		// let params = new URLSearchParams();
		// params.append("system_id", system_id)
		// let result = this.http.get('http://localhost:3000/findAllSprintsBySystem', {headers: headers, search: params});
		let result = this.http.get('http://localhost:3000/findAllStoriesBySprint/' + sprint_id);
		// console.log(JSON.stringify(result));
		return result

	}


	// addUser(data) {
	// 	let headers = new Headers({"Content-Type": "application/json"});
	// 	let options = new RequestOptions({ headers: headers });

	// 	return this.http.post('http://localhost:3000/adduser', JSON.stringify(data), options)
	// 		.map(res => res.json());
	// }
}
