import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {


  @Input()
  user: User;

  constructor(private auth: AuthenticationService, private router: Router,
    private dbService: DbService, public toastController: ToastController, private modalCtrl: ModalController) {

    this.user = new User();
  }

  ngOnInit() {
  }


  async updateUser() {
    await this.dbService.update('usuarios', this.user.uid, this.user)
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
