import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;

  constructor( 
    private router: Router,
    private afAuth: AngularFireAuth,
    public toastController: ToastController) { }

  ngOnInit() {
  }

  register(){
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.logar();
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  logar() {
    this.router.navigate(['tabs/home']);
  }

}
