import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Chat } from '../model/Chat';
import { Message } from '../model/Message';
import { DbService } from '../service/db.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @Input()
  chat : Chat;
  messages: Message[]; 

  constructor(private modalCtrl: ModalController, private dbService: DbService) { }

  ngOnInit() {
    console.log(this.chat);
  }

  async send(){
    const message = new Message();
    message.text
    message.userSend
    message.date
    this.chat.messages.push(message);
    await this.dbService.update('chats', this.chat.uid, { messages: this.chat.messages});
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
