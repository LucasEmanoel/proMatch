import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Chat } from '../model/Chat';
import { Message } from '../model/Message';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileInfoPage } from '../profile-info/profile-info.page';
import { NotificationService } from '../service/notification.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  providers: [NotificationService, LocalNotifications]
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  @Input()
  chat: Chat;

  messages: Message[];
  message: string;

  emailAuth: string;
  userAuth: User;
  loading;

  constructor(private modalCtrl: ModalController, private dbService: DbService,
    private auth: AuthenticationService, private notification: NotificationService) {
    this.userAuth = new User();
    this.getUserAuth();

  }

  ngOnInit() {
    this.initialize();
  }

  ionViewDidEnter() {

    this.ScrollToBottom();
  }

  async initialize() {

    if (!this.chat.messages) {
      this.chat.messages = [];
    }

    let titulo = '';
    let text = '';

    await this.dbService.listAndWatch<Message>(`chats/${this.chat.uid}/messages`)
      .subscribe(newList => {
        if (this.messages) {
          if (this.messages.length < newList.length && this.userAuth.uid !== newList[newList.length - 1].userSend) {
            titulo = this.chat.otherUser.name;
            text = newList[newList.length - 1].text;
            this.notification.generateNotificationMessage(titulo, text);
          }
        }
        this.messages = newList;
      });
  }

  async send() {
    if (this.message.length > 0) {
      const message = new Message();
      message.text = this.message;
      message.userSend = this.userAuth.uid;
      message.date = Date.now();

      this.chat.messages.push(message);
      await this.dbService.update('chats', this.chat.uid, { messages: this.chat.messages });

    }
    this.ScrollToBottom();
    this.message = '';

  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async getUserAuth() {
    this.emailAuth = this.auth.getUserEmailAuth();
    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.emailAuth))[0];
  }

  async openProfileInfo() {
    const modal = await this.modalCtrl.create({
      component: ProfileInfoPage,
      componentProps: { perfil: this.chat.otherUser }
    });
    return await modal.present();
  }

  ScrollToBottom() {
    this.content.scrollToBottom();
  }
}
