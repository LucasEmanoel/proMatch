import { Message } from './Message';

export class Chat{
  uid: string;
  userSendUID: string;
  userReceiveUID: string;
  massages: Message[];
}