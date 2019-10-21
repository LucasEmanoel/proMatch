import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  consulta: string;
  user: User;

  constructor(private auth: AuthenticationService, private dbService: DbService) {
    this.user = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();
  }

  ngOnInit() {
  }

  async getDataUserAuthentication() {
    this.user = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0];
  }
}
