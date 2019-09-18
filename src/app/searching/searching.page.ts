import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.page.html',
  styleUrls: ['./searching.page.scss'],
})
export class SearchingPage implements OnInit {

  constructor(private router: Router) { 
  }

  ngOnInit() {
  }

  goToSearchingSwipe(){
    this.router.navigate(['searching-swipeable']);
  }
}
