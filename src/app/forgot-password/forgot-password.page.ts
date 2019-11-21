import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: string;
  resetPassword: boolean;

  constructor(private router: Router, private auth: AuthenticationService  ) { }

  ngOnInit() {
  }

  resetPasswordByEmail(){
    if(this.email){
      this.auth.sendResetPassword(this.email).then(() => {
        this.resetPassword = true;
      })
    }
    
  }

  backLogin(){
    this.router.navigate['login'];
  }

}
