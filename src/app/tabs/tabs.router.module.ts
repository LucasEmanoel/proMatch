import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: '../adm/users/users.module#UsersPageModule'
          }
        ]
      },
      {
        path: 'games',
        children: [
          {
            path: '',
            loadChildren: '../adm/games/games.module#GamesPageModule'
          }
        ]
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'searching',
        children: [
          {
            path: '',
            loadChildren: '../searching/searching.module#SearchingPageModule'
          }
        ]
      },
      {
        path: 'matches',
        children: [
          {
            path: '',
            loadChildren: '../matches/matches.module#MatchesPageModule'

          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          },
          
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}