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

	getAll(entity, relations) {
		console.log(`Entity = ${entity} Relations = ${relations}`);
		let result = this.http.get(`${this.url}/api/${entity}/?relations=${relations}`);
		console.log(result);
		return result
	}

	//#region System

	getAllSystems() {
		let result = this.http.get(this.url + '/AgileSystems');
		return result
	}

	saveSystem(system) {
		let result = this.http.post(this.url + '/AgileSystems/');
		// console.log(JSON.stringify(result));
		return result
	}

	updateSystem(system) {
		var systemId = system.agileSprintId;
		let result = this.http.put(this.url + '/AgileSystems/' + systemId);
		// console.log(JSON.stringify(result));
		return result
	}

	//#endregion System

	//#region Teams

	getAllWorkTeams() {
		let result = this.http.get(this.url + '/getAllWorkTeams');
		return result
	}

	//#endregion Teams

	//#region Sprints

	getAllSprints() {
		let result = this.http.get(this.url + '/findAllSprints');
		return result
	}

	getAllSprintsBySystem(systemId) {
		let result = this.http.get(this.url + '/getAllSprintsBySystem/' + systemId);
		// console.log(JSON.stringify(result));
		return result
	}

	//#endregion Sprints

	//#region System Users

	getAllSystemUsersBySystem(sprintId) {
		let result = this.http.get(this.url + '/getAllSystemUsersBySystem/' + sprintId);
		// console.log(JSON.stringify(result));
		return result
	}

	saveSystemUser(systemUser) {
		let result = this.http.post(this.url + '/AgileSystems/');
		// console.log(JSON.stringify(result));
		return result
	}

	updateSystemUser(systemUser) {
		let result = this.http.post(this.url + '/updateSystemUser/' + systemUser);
		// console.log(JSON.stringify(result));
		return result
	}

	//#endregion System Users

	//#region Team Members

	getAllTeamMembersByTeam(teamId) {
		let result = this.http.get(this.url + '/getAllTeamMembersByTeam/' + teamId);
		// console.log(JSON.stringify(result));
		return result
	}

	//#endregion Team Members

	//#region Stories

	getAllStoriesWithUsersBySprint(sprintId) {
		// var stories = [];
		// var num: number = 0;
		// var i: number;
		// var factorial = 1;
		// for (i = num; i < sprint_id.length; i++) {
		// 	console.log("sprint id = " + sprint_id[i].agile_sprint_id)
		// console.log('@@@@@@@@@@ ' + sprint_id.length )
		let result = this.http.get(this.url + '/findAllStoriesWithUsersBySprint/' + sprintId);
		// console.log("result = " + result)
		// stories.push(result);
		// console.log(JSON.stringify(stories))
		// console.log(JSON.stringify(result));
		return result
		//	}
		// console.log(stories)
		// return stories;
	}

	getAllStoriesAndUsersBySprint(sprintId) {
		let result = this.http.get(this.url + '/getAllStoriesAndUsersBySprint/' + sprintId);
		return result
	}

	//#endregion Stories

	showLoadingPanel(): void {
		this.loadingVisible.next(true);
	}

	hideLoadingPanel(): void {
		this.loadingVisible.next(false);
	}
}
