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

	editTableData(asu_id, asu_name, as_id, wtm_id, wu_id) {
		let result = this.http.get(this.url + '/editTableData/' + asu_id + '/' + asu_name + '/' + as_id + '/' + wtm_id + '/' + wu_id) ;
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
