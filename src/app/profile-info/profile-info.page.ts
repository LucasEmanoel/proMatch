import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/User';
import { ModalController, LoadingController } from '@ionic/angular';
import { DbService } from '../service/db.service';
import { Game } from '../model/Game';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.page.html',
  styleUrls: ['./profile-info.page.scss'],
})
export class ProfileInfoPage implements OnInit {

  @Input()
  perfil: User;
  
  games: Game[];
  loading;

  constructor(private modalCtrl: ModalController, private dbService: DbService,
     private loadingController: LoadingController) {
    this.initialize();
    
   }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  
  async initialize() {
    await this.presentLoading();

    this.games = await this.dbService.listWithUIDs<Game>('games');

    const game = this.games.find(g => g.uid === this.perfil.gameUID);
    console.log(game);
    
    this.perfil['game'] = game;

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
