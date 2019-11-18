import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthenticationService]
})
export class LoginPage implements OnInit {

  loading;
  email: string;
  password: string;

  constructor(private router: Router, private authService: AuthenticationService,
    private alertController: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async login() {
    await this.presentLoading();
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['tabs']);
      })
      .catch(error => {
        console.log(error);
        this.presentAlert('E-mail e/ou senha inválido(s).');
      });
    await this.hideLoading();
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToForgotPassword() {
    this.router.navigate(['forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToRegisterProfile() {
    this.router.navigate(['register-profile']);
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

  changeElementFocus(item) {
    item.style.marginTop = 0;
  }
}
