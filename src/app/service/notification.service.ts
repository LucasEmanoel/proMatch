import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ILocalNotificationActionType } from '@ionic-native/local-notifications/ngx';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private localNotifications: LocalNotifications) { }

  generateNotificationMessage(titulo: string, text: string) {
    this.localNotifications.schedule({
      id: 1,
      icon: '../../assets/icon/game-controller.png',
      title: titulo,
      text: text,
      sound: 'file://sound.mp3',
      foreground: true,
      actions: [{
        id: 'reply',
        type: ILocalNotificationActionType.INPUT,
        title: 'Responder',
      }]
    });
    //this.localNotifications.on('submit').subscribe(notification => {
    //});
  }

  generateNotificationMatch(userName: string) {
    this.localNotifications.schedule({
      id: 2,
      icon: '../../assets/icon/game-controller.png',
      title: 'Match',
      text: `Match com: ${userName} bons jogos`,
      sound: 'file://sound.mp3'
    });
  }
}
