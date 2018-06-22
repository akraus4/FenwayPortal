import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
declare const gapi: any;
declare const signedIn: any;


// declare var profileImage: any;
//component

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements AfterViewInit {  
  

  private clientId: string = '409167539692-4eqnaq2jd1itl211gsgh3m2k7i02aefa.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
        
      });

        that.attachSignin(that.element.nativeElement.firstChild);
    });
  }
  public attachSignin(element) {
    var profileImage;
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {
        let profile = googleUser.getBasicProfile();
        // profileImage = profile.getImageUrl();
        //this.setProfileImage(profile.getImageUrl());
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // console.log('Profile: ' + profileImage);

        
      },
      function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
      function onSignIn(googleUser) {
        var id_token = googleUser.getAuthResponse().id_token
        this.SignInService.authenticateUserWithServer(id_token) 
        console.log(id_token) 
        JSON.stringify(id_token)

      }
  }

      authorizeUser(googleUser){
        var id_token = googleUser.getAuthResponse().id_token
        this.SignInService.authenticateUserWithServer(id_token) 
        console.log(id_token) 
        JSON.stringify(id_token)
      };
  

  // setProfileImage(p){
  //   console.log('Profile: ' + JSON.stringify(p));
  // }

  constructor(private element: ElementRef,private router: Router) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }



  };
  
