import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User;

  constructor(private dbService: DbService, private router: Router,
     private auth: AuthenticationService) {
    this.user = new User();
  }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.user.email, this.user.password);
    this.dbService.insertInList('usuarios', this.user);
    this.user = new User();
    this.logar();
  }

  logar() {
    this.router.navigate(['more-info']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

}
