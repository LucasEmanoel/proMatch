import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/service/db.service';
import { Game } from 'src/app/model/Game';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {

  games: Game[];

  constructor(private dbService : DbService,private router : Router,
    private toastController: ToastController  
    ) 
  {
    this.games = [];
    this.getGames();
  }

  ngOnInit() {
  }

  async getGames(){
    this.games = await this.dbService.listWithUIDs<Game>('games');
  }

  goToRegisterGame(){
    this.router.navigate(['register-game']);
  }

  async deleteGame(uid: string ){
    await this.dbService.remove('games', uid);
    this.presentToast('Deletado com sucesso');
    this.getGames();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
