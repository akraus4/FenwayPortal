import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import { Injectable, Inject } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
declare const gapi: any;
declare const signedIn: any;


// declare var profileImage: any;
//component



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

@Injectable()

export class SignInComponent implements AfterViewInit {  
  
  SignInService:any;
  profile;
  id_token;

  private clientId: string = '59141286914-b896i8udpnk94nutodo2k5rr681nepd9.apps.googleusercontent.com';

  constructor(private element: ElementRef,private router: Router, public metricsService: MetricsService) {
    console.log('ElementRef: ', this.element);
    // this.googleInit();
  }

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  // onSignIn(googleUser) {
  //   this.profile = googleUser.getBasicProfile();
  //   this.id_token = googleUser.getAuthResponse().id_token;
  //   // localStorage.setItem("profile", profile);
  //   // localStorage.setItem("token", id_token);
  //   console.log('ID: ' + this.profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + this.profile.getName());
  //   console.log('Image URL: ' + this.profile.getImageUrl());
  //   console.log('Email: ' + this.profile.getEmail());
  //   this.metricsService.hideSignInPanel();
  //   console.log('HERE'); 
  // }

  // public auth2: any;
  // public googleInit() {
  //   let that = this;
  //   gapi.load('auth2', function () {
  //     that.auth2 = gapi.auth2.init({
  //       client_id: that.clientId,
  //       cookiepolicy: 'single_host_origin',
  //       scope: that.scope
        
  //     });
  //     that.onSignIn(that.element.nativeElement.firstChild);
  //       // that.attachSignin(that.element.nativeElement.firstChild);
        
  //   });
  // }

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  // public attachSignin(element) {
  
  //   this.auth2.attachClickHandler(element, {},
  //     function (googleUser) {
  //       let profile = googleUser.getBasicProfile();
  //       // profileImage = profile.getImageUrl();
  //       //this.setProfileImage(profile.getImageUrl());
  //       console.log('Token || ' + googleUser.getAuthResponse().id_token);
  //       console.log('ID: ' + profile.getId());
  //       console.log('Name: ' + profile.getName());
  //       console.log('Image URL: ' + profile.getImageUrl());
  //       console.log('Email: ' + profile.getEmail());
  //       // console.log('Profile: ' + profileImage);

  //     },
  //     function (error) {
  //       console.log(JSON.stringify(error, undefined, 2));
  //     });
  //     // function onSignIn(googleUser) {
  //     //   var id_token = googleUser.getAuthResponse().id_token
  //     //   this.SignInService.authenticateUserWithServer(id_token) 
  //     //   console.log(`Id Token === ${JSON.stringify(id_token)}`) 
  //     // }
  // }

    // authorizeUser(googleUser){
    //   console.log(`Id Token === ${JSON.stringify(id_token)}`) 
    //   var id_token = googleUser.getAuthResponse().id_token
    //   this.SignInService.authenticateUserWithServer(id_token) 
    // };

  

  // setProfileImage(p){
  //   console.log('Profile: ' + JSON.stringify(p));
  // }



  ngAfterViewInit() {
    console.log(`Token Id === ${localStorage.getItem("token")}`);
  }



  };
  
