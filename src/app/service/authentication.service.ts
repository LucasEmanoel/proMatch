import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }
  
  async login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  
  sendResetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email)
  }

  getUserEmailAuth() {
    return this.afAuth.auth.currentUser.email;
  }

  isAdmin() {
  }

}
