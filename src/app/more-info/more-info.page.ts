import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { DbService } from '../service/db.service';
import { ToastController } from '@ionic/angular';
import { Game } from '../model/Game';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  data: User;
  games: Game[];

  constructor(private route: ActivatedRoute, private router: Router,
    private dbService: DbService, public toastController: ToastController) 
  {
    this.games = [];
    this.data = new User(); 
    this.initialize(); 
  }

  ngOnInit() {
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async initialize(){
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

    this.games = await this.dbService.listWithUIDs<Game>('games');  
  }
  
  async goToHome() {
    await this.dbService.insertInList('usuarios', this.data)
    .then(() => {
      this.presentToast("cadastro feito com sucesso.")
      this.router.navigate(['tabs/home']);
    })
    .catch(error => {
      console.log(error);
      
      this.presentToast("falha ao cadastrar.")
    });
    
  }
}
