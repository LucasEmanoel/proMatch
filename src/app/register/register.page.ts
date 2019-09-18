import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../service/db.service';
import { User } from '../model/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User;

  constructor(private dbService: DbService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
  }

  register() {
    this.dbService.insertInList('usuarios', this.user);
    this.user = new User();
    this.logar();
  }

  logar() {
    this.router.navigate(['tabs/home']);
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

}
