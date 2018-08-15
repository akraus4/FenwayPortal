import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const httpOptions = {
	headers: new Headers({ 'Content-Type': 'application/json' })
};

const ID_TOKEN_KEY = 'id_token';

@Injectable()
export class MetricsService {

	
	
	developmentURL = 'http://localhost:3000'
	productionURL = ''
	url = this.developmentURL
	http: any;
	loadingVisible = new BehaviorSubject<boolean>(false);
	signInVisible = new BehaviorSubject<boolean>(true);

	constructor(@Inject(Http) http) {
		this.http = http;
	}


	getAll(entity, relations, conditions) {
		console.log(`URL ====  ${this.url}/api/${entity}?relations=${relations}&conditions=${conditions}`);
		let result = this.http.get(`${this.url}/api/${entity}?relations=${relations}&conditions=${conditions}`);
		console.log(result);
		return result
	}

	save(entity, object) {
		console.log(`URL Post ====  ${this.url}/api/${entity}`);
		let body = JSON.stringify(object);
		let result = this.http.post(`${this.url}/api/${entity}`, body, httpOptions);
		// console.log(JSON.stringify(result));
		return result
	}

	update(entity, id, object) {
		console.log(`URL Put ====  ${this.url}/api/${entity}/${id}`);
		let body = JSON.stringify(object);
		let result = this.http.put(`${this.url}/api/${entity}/${id}`, body, httpOptions);
		// console.log(JSON.stringify(result));
		return result
	}


	getAllStoriesPointsByUser(sprintIds) {
		console.log('made it');
		let conditions = `agileSprint=[${sprintIds}]`;
		console.log(`URL ====  ${this.url}/api/AgileStories?relations=agileStoryAgileSystemUsers,agileStoryAgileSystemUsers.agileSystemUser,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember.workUser,agileSprint&conditions=${conditions}`);
		let results = this.http.get(`${this.url}/api/AgileStories?relations=agileStoryAgileSystemUsers,agileStoryAgileSystemUsers.agileSystemUser,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember,agileStoryAgileSystemUsers.agileSystemUser.workTeamMember.workUser,agileSprint&conditions=${conditions}`);
		
		return results
	}



	showLoadingPanel(): void {
		this.loadingVisible.next(true);
	}

	hideLoadingPanel(): void {
		this.loadingVisible.next(false);
	}

	showSignInPanel(): void {
		this.signInVisible.next(true);
	}

	hideSignInPanel(): void {
		this.signInVisible.next(false);
	}

}
