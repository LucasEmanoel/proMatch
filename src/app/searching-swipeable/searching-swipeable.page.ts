import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searching-swipeable',
  templateUrl: './searching-swipeable.page.html',
  styleUrls: ['./searching-swipeable.page.scss'],
})
export class SearchingSwipeablePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  swipeLeft(event: any): any {
    console.log('Swipe Left', event);
  }

  swipeRight(event: any): any {
    console.log('Swipe Right', event);
  }

  cardSwipe(){

  }
  cardDestroyed(){

  }

  like(){

  }

  dislike(){
    
  }
}
