import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  facebookLogoPath: string;
  twitterLogoPath: string;
  linkedInLogoPath: string;
  fenwayLogoPath: string;
  constructor() {
    this.facebookLogoPath = './assets/Facebook_icon.png';
    this.twitterLogoPath = './assets/Twitter_Icon.png';
    this.linkedInLogoPath = './assets/LinkedIn_Icon.png';
    this.fenwayLogoPath = './assets/FGLogoCircle.png';
   }

  ngOnInit() {
  }

}
