import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthenticationService]
})
export class LoginPage implements OnInit {

  private email: string;
  private password: string;

  constructor(private router: Router, private authService: AuthenticationService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  logar(){
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigate(['tabs/home']);
      })
      .catch(error => {
        console.log(error);
        this.presentAlert('E-mail e/ou senha inválido(s).');
      });

    this.router.navigate(['login']);
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Login',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  goToForgotPassword(){
    this.router.navigate(['forgot-password']);
  }
  goToRegister(){
    this.router.navigate(['register']);
  }

}
