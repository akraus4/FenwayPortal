import { Component } from '@angular/core'
import { Router } from '@angular/router'
import * as $ from 'jquery'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  logoPath: string
  logoPathToggled: string

  constructor (private router: Router) {
    this.logoPath = './assets/FGLogoVer.png'
    this.logoPathToggled = './assets/FGLogoCircle.png'
  }

  toggleMenu () {
    $('#wrapper').toggleClass('toggled')
    $('#contentDiv').toggleClass('col-sm-12 col-sm-13')
    $('#toggleIconDiv').toggleClass('toggled')
  }

}
