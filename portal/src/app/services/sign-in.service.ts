import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

var id_token;

@Injectable()

export class SignInService {
  
	// developmentURL = 'http://localhost:5000'
	// productionURL = ''
	// url = this.developmentURL
	// http: any;


	// constructor(@Inject(Http) http) {
	// 	this.http = http;	
  //   }

  //   authenticateUserWithServer(){
  //       var xhr = new XMLHttpRequest();
  //       xhr.open('POST', 'https://localhost:5000/tokensignin');
  //       xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //       xhr.onload = function() {
  //         console.log('Signed in as: ' + xhr.responseText);
  //       };
  //       xhr.send('idtoken=' + id_token);
  //   };

}