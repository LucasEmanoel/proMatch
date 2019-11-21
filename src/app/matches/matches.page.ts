import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { LoadingController, ModalController } from '@ionic/angular';
import { Chat } from '../model/Chat';
import { ChatPage } from '../chat/chat.page';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  chats: Chat[];
  users: User[];
  emailAuth: string;
  userAuth: User;
  loading;

  constructor(private auth: AuthenticationService, private dbService: DbService,
    private loadingController: LoadingController, private modalController: ModalController) {
    this.chats = [];
    this.users = [];
    this.getUserAuth();
  }

  ngOnInit() {
    
  }
  
  ionViewDidEnter(){
    this.initialize();
  }

  async initialize() {
    await this.presentLoading();

    this.chats = await this.dbService.listWithUIDs<Chat>('chats');
    this.users = await this.dbService.listWithUIDs<User>('usuarios');

    this.chats = this.chats.filter(chat => {
      return chat.userOneUID === this.userAuth.uid || chat.userTwoUID === this.userAuth.uid;
    });

    this.chats.forEach(chat => {
      this.users.map(user => {
        if (chat.userOneUID === this.userAuth.uid && chat.userTwoUID === user.uid) {
          chat['photo'] = user.photo || null;
          chat.otherUser = user;
        }
        if (chat.userTwoUID === this.userAuth.uid && chat.userOneUID === user.uid) {
          chat['photo'] = user.photo || null;
          chat.otherUser = user;
        }
      })
    });

    await this.hideLoading();
  }

  async openChat(chat) {
    const modal = await this.modalController.create({
      component: ChatPage,
      componentProps: { chat : chat }
    });
    return await modal.present();
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

  async getUserAuth() {
    this.emailAuth = this.auth.getUserEmailAuth();
    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.emailAuth))[0];
  }
}
