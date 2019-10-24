import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  consulta: string;
  user: User;
  loading;

  constructor(private auth: AuthenticationService, private dbService: DbService,
    private loadingController: LoadingController) {
    this.user = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();
  }

  ngOnInit() {
  }

  async getDataUserAuthentication() {
    await this.presentLoading();
    this.user = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0];

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
}
