import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()

export class DataService {
	developmentURL = 'http://localhost:5000'
	productionURL = ''
	url = this.developmentURL
	http: any;

	constructor(@Inject(Http) http) {
		this.http = http;
	}

	//Not pulling data because our work team ID's do not match with work team tables.
	findTableData(table_name) {
		let result = this.http.get(this.url + '/findTableData/' + table_name);
		console.log(JSON.stringify(result));
		return result

	}

	editTableDataWDailyhours(wDailyhours_id,wTeam_member_id,work_date,hours) {
		let result = this.http.get(this.url + '/editTableDataWDailyhours/' + wDailyhours_id + '/' + wTeam_member_id + '/' + work_date + '/' + hours) ;
		console.log(JSON.stringify(result));
		return result
	}

	editTableDataASystem(aSystem_id,aSystem_name,aSystem_type,wTeam_id) {
		let result = this.http.get(this.url + '/editTableDataASystem/' + aSystem_id + '/' + aSystem_name + '/' + aSystem_type + '/' + wTeam_id) ;
		console.log(JSON.stringify(result));
		return result
	}

	editTableDataASystemUser(asu_id, asu_name, aSystem_id, wtm_id, wu_id) {
		let result = this.http.get(this.url + '/editTableDataASystemUser/' + asu_id + '/' + asu_name + '/' + aSystem_id + '/' + wtm_id + '/' + wu_id) ;
		console.log(JSON.stringify(result));
		return result
	}

	editTableDataASprint(aSprintId,aSprintName,aSystemId,sprintDescription,sprintStartDate,sprintEndDate) {
		let result = this.http.get(this.url + '/editTableDataASprint/' + aSprintId + '/' + aSprintName + '/' + aSystemId + '/' + sprintDescription + '/' + sprintStartDate + '/' + sprintEndDate) ;
		console.log(JSON.stringify(result));
		return result
	}

	editTableDataAStory(aStoryId,aStoryName,aSprintId,storyDescription,storyType,storyStatus,storyPoints) {
		let result = this.http.get(this.url + '/editTableDataAStory/' + aStoryId + '/' + aStoryName + '/' + aSprintId + '/' + storyDescription + '/' + storyType + '/' + storyStatus + '/' + storyPoints) ;
		console.log(JSON.stringify(result));
		return result
	}
	findDropDownData(table_name) {
		let result = this.http.get(this.url + '/findDropDownData/'+ table_name);
		console.log(JSON.stringify(result));
		return result
	}
}

// 	getSystemUserWithSystemWithTeamMemberWithWorkUser() {
// 		let result = this.http.get(this.url + '/findSystemUserWithSystemWithTeamMemberWithWorkUser');
// 		console.log(JSON.stringify(result));
// 		return result

// 	}
// }
