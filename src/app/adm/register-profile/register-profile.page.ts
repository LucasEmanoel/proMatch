import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/Profile';
import { DbService } from 'src/app/service/db.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register-profile',
  templateUrl: './register-profile.page.html',
  styleUrls: ['./register-profile.page.scss'],
})
export class RegisterProfilePage implements OnInit {

  newProfile: Profile;

  constructor(private dbService: DbService, public toastController: ToastController, private router: Router) {
    this.newProfile = new Profile();
  }

  ngOnInit() {
  }
  
  async save(){
    await this.dbService.insertInList('perfis', this.newProfile);

    this.newProfile = new Profile();

    this.presentToast('Perfil cadastrado com sucesso.');
  }

  async presentToast(msg : string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
