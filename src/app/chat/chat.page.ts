import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { Chat } from '../model/Chat';
import { Message } from '../model/Message';
import { DbService } from '../service/db.service';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileInfoPage } from '../profile-info/profile-info.page';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  @Input()
  chat : Chat;

  messages: any[];
  message: string;

  consulta: string;
  userAuth: User;
  loading;

  constructor(private modalCtrl: ModalController, private dbService: DbService,
    private auth: AuthenticationService) {
    this.userAuth = new User();
    this.consulta = this.auth.getUserEmailAuth();
    this.getDataUserAuthentication();
    
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.initialize();
  }

  async initialize() {
    if(!this.chat.messages)
      this.chat.messages = this.messages = [];

    if (this.chat.messages) {
      this.messages = this.chat.messages;

      /*this.messages.forEach(msg => {
        if (msg.userSend === this.userAuth.uid) 
          msg['me'] = true;
      });*/
    }
  }

  async send() {

    const message = new Message();
    message.text = this.message;
    message.userSend = this.userAuth.uid;
    message.date = Date.now();

    this.chat.messages.push(message);
    
    /*this.messages.forEach(msg => {
      if (msg.userSend === this.userAuth.uid)
        msg['me'] = null;
    });*/

    await this.dbService.update('chats', this.chat.uid, { messages: this.chat.messages });

    message['me'] = true;
    this.messages.push(message);

    //this.initialize();

    //se a tela tiver longe do bottom descer 
    //this.ScrollToBottom();
    this.message = '';
    console.log(this.messages);
    
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  async getDataUserAuthentication() {
    this.userAuth = (await this.dbService.search<User>('usuarios', 'email', this.consulta))[0];
  }

  async openProfileInfo() {
    console.log(this.chat.otherUser);
    
    const modal = await this.modalCtrl.create({
      component: ProfileInfoPage,
      componentProps: { perfil : this.chat.otherUser }
    });
    return await modal.present();
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }
}
