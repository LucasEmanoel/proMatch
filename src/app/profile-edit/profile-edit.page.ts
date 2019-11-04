import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Game } from '../model/Game';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {


  @Input()
  userAuth: User;
  games: Game[];

  constructor(private router: Router, private dbService: DbService,
    public toastController: ToastController, private modalCtrl: ModalController) {

    this.userAuth = new User();
    this.initialize();
  }

  ngOnInit() {
  }

  async initialize() {
    this.games = await this.dbService.listWithUIDs<Game>('games');
  }

  async updateUser() {
    await this.dbService.update('usuarios', this.userAuth.uid,
      {
        name: this.userAuth.name,
        description: this.userAuth.description,
        gameUID: this.userAuth.gameUID
      })
      .then(() => {
        this.presentToast("editado com sucesso.")
        this.router.navigate(['tabs/profile']);
        this.dismiss();
      })
      .catch(error => {
        console.log(error);
        this.presentToast("falha ao editar.")
      });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  changePhoto() {
    alert('nao sei ainda')
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
