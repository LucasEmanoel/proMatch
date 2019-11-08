import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  
  consulta: string;
  user: User;

  constructor(private auth: AuthenticationService, private dbService: DbService,
    private router: Router) { 

    this.user = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();

  }
  async getDataUserAuthentication() {
    this.user = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0];
    if(this.user.isAdmin){
      this.router.navigate(['tabs/users']);
    } 
  }

  ngOnInit() {
  }
}
