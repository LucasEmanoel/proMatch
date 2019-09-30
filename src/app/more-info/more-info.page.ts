import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { DbService } from '../service/db.service';
import { AuthenticationService } from '../service/authentication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.page.html',
  styleUrls: ['./more-info.page.scss'],
})
export class MoreInfoPage implements OnInit {

  data: User;
  authUID: string;

  constructor(private route: ActivatedRoute, private router: Router,
    private dbService: DbService, private auth: AuthenticationService,
    public toastController: ToastController) {

    this.data = new User();

    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });

    this.setUid();
  }

  ngOnInit() {
  }

  async setUid(){
    this.authUID = await this.auth.getUserAuth();
    this.data['authUID'] = this.authUID;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  goToHome() {
    this.dbService.insertInList('usuarios', this.data)
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
