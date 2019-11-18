import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DbService } from './service/db.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { ProfileEditPage } from './profile-edit/profile-edit.page';
import { FormsModule } from '@angular/forms';
import { ChatPage } from './chat/chat.page';
import { ProfileInfoPage } from './profile-info/profile-info.page';

@NgModule({
  declarations: [AppComponent, ProfileEditPage, ChatPage, ProfileInfoPage],
  entryComponents: [ ProfileEditPage, ChatPage, ProfileInfoPage ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicSwipeAllModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireDatabase,
    AngularFireAuth,
    DbService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
