import { Component, ViewChild,ViewChildren, QueryList,  OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

@Component({
  selector: 'app-searching-swipeable',
  templateUrl: './searching-swipeable.page.html',
  styleUrls: ['./searching-swipeable.page.scss'],
  providers: [DbService]
})
export class SearchingSwipeablePage implements OnInit {
  @ViewChild('myswing1', {static: true}) swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  private usuarios : User[];

  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';

  constructor(private dbService : DbService, private router: Router) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    }; 
    this.getUsers();
  }
  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{ email: '' }];
    this.getUsers();

    console.log(this.swingStack); // this is the stack
    console.log(this.swingCards); // this is a list of cards
  }
  ngOnInit() {
  }

  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.getUsers();
    if (like) {
      this.recentCard = 'You liked: ' + removedCard.email;
    } else {
      this.recentCard = 'You disliked: ' + removedCard.email;
    }
  }

  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    if (x < 0) {
      color = '#FF' + hexCode + hexCode;
    } else {
      color = '#' + hexCode + 'FF' + hexCode;
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }


  async getUsers(){
    this.cards = await this.dbService.listWithUIDs<User>('usuarios');
  }

  backFinding(){
    this.router.navigate(['tabs/searching'])
  }
}
