import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User;
  password: string;

  constructor(private router: Router, private auth: AuthenticationService,
    private alertController: AlertController) {
    this.user = new User();
  }

  ngOnInit() {
  }

  async register() {
    await this.auth.register(this.user.email, this.password)
    .then(() => {
      this.goToMoreInfo();
    })
    .catch(error => {
      console.log(error);
      this.presentAlert('Este E-mail já está em uso. Tente outro.');
    });
    
  }

  goToMoreInfo() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.user)
      }
    }
    this.router.navigate(['more-info'], navigationExtras);
    this.user = new User();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  goToLogin() {
    this.router.navigate(['login']);
  }

}
