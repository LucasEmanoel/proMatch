import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { ModalController, LoadingController } from '@ionic/angular';
import { ProfileEditPage } from '../profile-edit/profile-edit.page';
import { Game } from '../model/Game';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  emailAuth: string;
  userAuth: User;
  games: Game[];
  loading;

  constructor(private auth: AuthenticationService, private dbService: DbService, 
    public modalController: ModalController, private loadingController: LoadingController) {
    this.games = [];
    this.userAuth = new User;
    this.getUserAuth();
    this.initialize();

  }

  ngOnInit() {
  }

  async initialize() {
    await this.presentLoading();

    this.games = await this.dbService.listWithUIDs<Game>('games');

    const game = this.games.find(g => g.uid === this.userAuth.gameUID);
    
    this.userAuth['game'] = game;

    await this.hideLoading();
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: ProfileEditPage,
      componentProps: { perfil : this.userAuth }
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
