import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Game } from '../model/Game';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-searching-swipeable',
  templateUrl: './searching-swipeable.page.html',
  styleUrls: ['./searching-swipeable.page.scss'],
  providers: [DbService]
})
export class SearchingSwipeablePage implements OnInit {

  emailAuth: string;
  userAuth: User;
  likes: any;
  dislikes: any;
  cards: User[];
  games: Game[];
  lastCard: string = '';
  loading;

  constructor(private dbService: DbService, private router: Router,
    private loadingController: LoadingController, private auth: AuthenticationService) {
    this.userAuth = new User();
    this.emailAuth = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();
    this.initialize();
    
  }

  swipeLeft(event: any): any {
    this.like(false);
  }

  swipeRight(event: any): any {
    this.like(true);
  }

  async like(like: boolean) {
    let removedCard = this.cards.pop();
    //this.animateCSS('ion-card', 'fade', )
    if (like) {
      
      this.dbService.insertInList('usuarios/' + this.userAuth.uid + '/likes', { user : removedCard.uid });

      this.lastCard= 'Ultimo Like: ' + removedCard.name;
    } else {
      this.dbService.insertInList('usuarios/' + this.userAuth.uid + '/dislikes', { user : removedCard.uid });
   
      this.lastCard= 'Ultimo Dislike: ' + removedCard.name;
    }
  }

  async initialize() {
    await this.presentLoading();

    this.cards = await this.dbService.listWithUIDs<User>('usuarios');
    this.games = await this.dbService.listWithUIDs<Game>('games');
    this.likes = await this.dbService.listWithUIDs<any>('usuarios/'+ this.userAuth.uid+ "/likes");
    this.dislikes = await this.dbService.listWithUIDs<any>('usuarios/'+ this.userAuth.uid+ "/dislikes");

    this.cards.forEach(user => {
      const game = this.games.filter(g => g.uid === user.gameUID)[0];
      user['game'] = game;
    });

    this.cards = this.cards.filter(c => c.uid !== this.userAuth.uid);
    this.likes.forEach(like => {
      this.cards = this.cards.filter(c => c.uid !== like.user);
    })
    this.dislikes.forEach(dislike => {
      this.cards = this.cards.filter(c => c.uid !== dislike.user);
    })
    
    await this.hideLoading();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando'
    });
    await this.loading.present();

  }

  async hideLoading() {
    this.loading.dismiss();
  }

  backFinding() {
    this.router.navigate(['tabs/searching'])
  }

  async getDataUserAuthentication() {

    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.emailAuth))[0]; 
    
  }

  animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
  }

  ngOnInit() {
  }
}
