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

  users: User[];
  user: User;
  uid: string;

  constructor(private router: Router, private auth: AuthenticationService,
    private dbService: DbService) {

    this.user = new User();
    this.uid = this.auth.getUserAuth();
    this.getUserAuthentication();
    
  }

  ngOnInit() { 
  }

  async getUserAuthentication() {
    this.users = await this.dbService.search('usuarios', 'authUID', this.uid);
    this.user = this.users[0];
  }
  editProfile() {
    this.router.navigate(['profile-edit']);
  }

}
