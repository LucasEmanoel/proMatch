import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

  users: User[];
  user: User;
  uid: string;

  constructor(private router: Router, private auth: AuthenticationService,
    private dbService: DbService, public toastController: ToastController) {

    this.user = new User();
    this.uid = this.auth.getUserAuth();
    this.getUserAuthentication();
  }

  ngOnInit() {
  }

  async getUserAuthentication() {
    this.users = await this.dbService.search('usuarios', 'authUID', this.uid);
    this.user = this.users[0];
  }

  async updateUser() {
    await this.dbService.update('usuarios', this.user.uid, this.user)
      .then(() => {
        this.presentToast("editado com sucesso.")
      })
      .catch(error => {
        console.log(error);
        this.presentToast("falha ao editar.")
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
