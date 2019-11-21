import { Component, OnInit } from '@angular/core';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Game } from '../model/Game';
import { AuthenticationService } from '../service/authentication.service';
import { Chat } from '../model/Chat';
import { ProfileInfoPage } from '../profile-info/profile-info.page';
import { NotificationService } from '../service/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-searching-swipeable',
  templateUrl: './searching-swipeable.page.html',
  styleUrls: ['./searching-swipeable.page.scss'],
  providers: [DbService, NotificationService, LocalNotifications]
})
export class SearchingSwipeablePage implements OnInit {

  emailAuth: string;
  userAuth: User;
  likes: any;
  dislikes: any;
  cards: User[];
  games: Game[];
  loading;

  constructor(private dbService: DbService, private router: Router,
    private loadingController: LoadingController, private auth: AuthenticationService,
    private modalController: ModalController, private notification : NotificationService) {
    this.getUserAuth();
    this.initialize();

  }

  ngOnInit() {
  }

  swipeLeft(event: any): any {
    this.like(false);
  }

  swipeRight(event: any): any {
    this.like(true);
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

      if (!user.likes) {
        user.likes = []
      }
      if (!user.dislikes) {
        user.dislikes = [];
      }
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

  async like(like: boolean) {
    
    if(like) {
      this.cards[this.cards.length - 1]['liked'] = true;
    }else{
      this.cards[this.cards.length - 1]['disliked'] = true;
    }

    setTimeout(async () => {
      const removedCard = this.cards.pop();

      if (like) {
        this.userAuth.likes.push(removedCard.uid);
        if(!removedCard.numberLikes) {
          removedCard.numberLikes = 0;
        }
        removedCard.numberLikes = removedCard.numberLikes + 1; 
        console.log(removedCard);
        
        await this.dbService.update('usuarios', this.userAuth.uid, { likes: this.userAuth.likes });
        await this.dbService.update('usuarios', removedCard.uid, { numberLikes: removedCard.numberLikes });

        removedCard.likes.forEach(async like => {
          if (like === this.userAuth.uid) {
            const chat = new Chat();
            chat.userOneUID = this.userAuth.uid;
            chat.userTwoUID = removedCard.uid;
            await this.dbService.insertInList('chats', chat);
            this.notification.generateNotificationMatch(removedCard.name);
          }
        });
      } else {
        this.userAuth.dislikes.push(removedCard.uid);
        await this.dbService.update('usuarios', this.userAuth.uid, { dislikes: this.userAuth.dislikes });
      }
    }, 1000);
  }

  
  
  async openProfileInfo() {
    const card = this.cards[this.cards.length - 1];
    const modal = await this.modalController.create({
      component: ProfileInfoPage,
      componentProps: { perfil : card }
    });
    return await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando...'
    });
    await this.loading.present();

  }

  async hideLoading() {
    this.loading.dismiss();
  }

  async getUserAuth() {
    this.emailAuth = this.auth.getUserEmailAuth();
    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.emailAuth))[0];
  }
}
