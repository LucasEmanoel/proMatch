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
    this.cards[0]['liked'] = true;

    setTimeout(() => {
      let removedCard = this.cards.pop();
      //this.animateCSS('ion-card', 'fade', )
      if (like) {

        this.userAuth.likes.push(removedCard.uid);
        this.dbService.update('usuarios', this.userAuth.uid, { likes: this.userAuth.likes });
        this.lastCard = 'Ultimo Like: ' + removedCard.name;
      } else {

        this.userAuth.dislikes.push(removedCard.uid);
        this.dbService.update('usuarios', this.userAuth.uid, { dislikes: this.userAuth.dislikes });
        this.lastCard = 'Ultimo Dislike: ' + removedCard.name;
      }
    }, 2000);


  }

  async initialize() {
    await this.presentLoading();

    this.cards = await this.dbService.listWithUIDs<User>('usuarios');
    this.games = await this.dbService.listWithUIDs<Game>('games');

    if (!this.userAuth.likes) {
      this.userAuth.likes = []
    }
    if (!this.userAuth.dislikes) {
      this.userAuth.dislikes = [];
    }

    this.likes = this.userAuth.likes;
    this.dislikes = this.userAuth.dislikes;

    this.cards.forEach(user => {
      const game = this.games.filter(g => g.uid === user.gameUID)[0];
      user['game'] = game;
    });

    this.cards = this.cards.filter(c => c.uid !== this.userAuth.uid);
    this.likes.forEach(like => {
      this.cards = this.cards.filter(c => c.uid !== like);
    })
    this.dislikes.forEach(dislike => {
      this.cards = this.cards.filter(c => c.uid !== dislike);
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
