import { Message } from './Message';

export class Chat{
  uid: string;
  userOneUID: string;
  userTwoUID: string;
  messages: Message[];
}