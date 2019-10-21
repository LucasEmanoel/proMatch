import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { DbService } from 'src/app/service/db.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  
  users : User[];

  constructor(private dbService: DbService) {
    this.users = [];
    this.getUsers();
   }

  ngOnInit() {
  }

  async getUsers(){
    this.users = await this.dbService.listWithUIDs('usuarios');
  }


}
