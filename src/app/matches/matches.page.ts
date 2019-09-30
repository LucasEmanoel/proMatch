import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { DbService } from '../service/db.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  constructor(private auth: AuthenticationService, private dbService: DbService) {}

  ngOnInit() {
  }
  
}
