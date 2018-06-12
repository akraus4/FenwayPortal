import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  logoPath: string;
  logoPathToggled: string;

  constructor(private router: Router) {
    this.logoPath = './assets/FGLogoVer.png';
    this.logoPathToggled = './assets/FGLogoCircle.png';
  }

  ngOnInit() { }
  toggleMenu() {
    // $("#navDiv").toggleClass("toggled");
    $("#wrapper").toggleClass("toggled");
    $("#contentDiv").toggleClass("col-sm-12 col-sm-13");
    $("#toggleIconDiv").toggleClass("toggled");
    // $("#navDiv").toggleClass("col-sm-2 col-sm-1");
    
    // $("#toggleIconDiv").toggleClass("toggled");
  }

}
