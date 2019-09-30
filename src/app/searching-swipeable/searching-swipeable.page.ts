import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searching-swipeable',
  templateUrl: './searching-swipeable.page.html',
  styleUrls: ['./searching-swipeable.page.scss'],
  providers: [DbService]
})
export class SearchingSwipeablePage implements OnInit {

  private usuarios : User[];

  constructor(private dbService : DbService, private router: Router) { 
    this.getUsers();
  }

  ngOnInit() {
  }
  backFinding(){
    this.router.navigate(['tabs/searching'])
  }
  async getUsers(){
    this.usuarios = await this.dbService.listWithUIDs<User>('usuarios');
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
