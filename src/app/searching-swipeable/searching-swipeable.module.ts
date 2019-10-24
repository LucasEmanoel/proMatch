import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchingSwipeablePage } from './searching-swipeable.page';

const routes: Routes = [
  {
    path: '',
    component: SearchingSwipeablePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchingSwipeablePage]
})
export class SearchingSwipeablePageModule {}
