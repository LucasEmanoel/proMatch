import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { User } from '../model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  consulta: string;
  user: User;

  constructor(private router: Router, private auth: AuthenticationService,
    private dbService: DbService) {

    this.user = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication(); 
  }

  ngOnInit() {
  }

  async getDataUserAuthentication() {
    this.user = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0]; 
  }
  
  editProfile() {
    this.router.navigate(['profile-edit']);
  }

}
