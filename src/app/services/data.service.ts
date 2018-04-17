import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class DataService {

	http: any;

	constructor(@Inject(Http) http) {
		this.http = http;
    }
    //Not pulling data because our work team ID's do not match with work team tables.
    getSystemWithSystemUserWithWorkTeam() {
		let result = this.http.get('http://localhost:3000/findSystemWithSystemUserWithWorkTeam');
		console.log(JSON.stringify(result));
		return result

	}
	getSystemUserWithSystemWithTeamMemberWithWorkUser() {
		let result = this.http.get('http://localhost:3000/findSystemUserWithSystemWithTeamMemberWithWorkUser');
		console.log(JSON.stringify(result));
		return result

	}
}