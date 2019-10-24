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

  consulta: string;
  userAuth: User;
  games: Game[];
  loading;

  constructor(private auth: AuthenticationService, private dbService: DbService, 
    public modalController: ModalController, private loadingController: LoadingController) {
    this.games = [];
    this.userAuth = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();
    this.initialize()

  }

  ngOnInit() {
  }

  async getDataUserAuthentication() {
    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0];
  }

  async initialize() {
    await this.presentLoading();

    this.games = await this.dbService.listWithUIDs<Game>('games');

    const game = this.games.filter(g => g.uid === this.userAuth.gameUID)[0];
    this.userAuth['game'] = game;

    await this.hideLoading();
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: ProfileEditPage,
      componentProps: { userAuth: this.userAuth }
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

}
