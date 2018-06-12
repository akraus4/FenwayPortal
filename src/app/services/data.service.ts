import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DxDataGridComponent } from 'devextreme-angular';

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
	editTableDataWUser(wUserId,fName,lName,email) {
		let result = this.http.get(this.url + '/editTableDataWUser/' + wUserId + '/' + fName + '/' + lName + '/' + email) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataWTeam(wTeamId,wTeamName,pNameworkTeam,pName) {
		let result = this.http.get(this.url + '/editTableDataWTeam/' + wTeamId + '/' + wTeamName + '/' + pNameworkTeam + '/' + pName) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataWTeamMember(wTeamMemberId,wTeamId,wUserId) {
		let result = this.http.get(this.url + '/editTableDataWTeamMember/' + wTeamMemberId + '/' + wTeamId + '/' + wUserId) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataASU(asu_id, asu_name, as_id, wtm_id, wu_id) {
		let result = this.http.get(this.url + '/editTableDataASU/' + asu_id + '/' + asu_name + '/' + as_id + '/' + wtm_id + '/' + wu_id) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataASprint(aSprintId,aSprintName,aSystemId,sDescription,sStartDate,sEndDate) {
		let result = this.http.get(this.url + '/editTableDataASprint/' + aSprintId + '/' + aSprintName + '/' + aSystemId + '/' + sDescription + '/' + sStartDate + '/' + sEndDate) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataAStory(aStoryId,aSprintId,sType,sStatus,sPoints) {
		let result = this.http.get(this.url + '/editTableDataAStory/' + aStoryId + '/' + aSprintId + '/' + sType + '/' + sStatus + '/' + sPoints) ;
		console.log(JSON.stringify(result));
		return result
	}
	editTableDataASAgileSystemUser(aStoryAgileSystemUserId,aStoryId,aSystemUserId,aSystemUserStoryPoints) {
		let result = this.http.get(this.url + '/editTableDataASAgileSystemUser/' + aStoryAgileSystemUserId + '/' + aStoryId + '/' + aSystemUserId + '/' + aSystemUserStoryPoints) ;
		console.log(JSON.stringify(result));
		return result
	}
	findDropDownData(table_name) {
		let result = this.http.get(this.url + '/findDropDownData/'+ table_name);
		console.log('Result = ' + JSON.stringify(result));
		console.log('Result 2 = ' + result);
		var results = JSON.stringify(result).split(', ');
		console.log('Result Story = ' + JSON.stringify(results[0]));

		return result
	}
}

// 	getSystemUserWithSystemWithTeamMemberWithWorkUser() {
// 		let result = this.http.get(this.url + '/findSystemUserWithSystemWithTeamMemberWithWorkUser');
// 		console.log(JSON.stringify(result));
// 		return result

// 	}
// }
