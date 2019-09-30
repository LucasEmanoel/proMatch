import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private router: Router, private auth : AuthenticationService ) {
    
  }
  
  goToMatches(){
    this.router.navigate(['tabs/matches']);
  }

  goToSearchSwipe(){
    this.router.navigate(['searching-swipeable']);
  }
}
