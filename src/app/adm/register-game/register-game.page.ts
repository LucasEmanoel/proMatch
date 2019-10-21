import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/model/Game';
import { DbService } from 'src/app/service/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-game',
  templateUrl: './register-game.page.html',
  styleUrls: ['./register-game.page.scss'],
})
export class RegisterGamePage implements OnInit {
  
  game : Game;

  constructor(private dbService: DbService, 
    private toastController: ToastController,
    private router: Router) 
  { 
    this.game = new Game();
  }

  ngOnInit() {
  }

  register(){
    this.dbService.insertInList('games', this.game);
    this.game = new Game;
    this.presentToast('Registrado com Suceso');
    this.router.navigate(['tabs/games']);
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }


}
