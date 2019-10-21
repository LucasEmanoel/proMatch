import { Game } from './Game';

export class User {
  uid: string;
  email: string;
  name: string;
  gameUID: Game;
  description: string;
  isAdmin: boolean;
}