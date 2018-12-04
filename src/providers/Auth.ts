import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';

import { UserProvider } from './User';

import { User } from 'firebase';
import { UserInfo } from './../models/UserInfo';
import { SignInfo } from './../models/SignInfo';

@Injectable()
export class AuthProvider {

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private userService: UserProvider
  ) {
  }

  get uid() {
    return this.getCurrentUser().uid;
  }

  getCurrentUser(): User {
    return this.afAuth.auth.currentUser;
  }

  getIdToken(): Promise<any> {
    return this.getCurrentUser().getIdToken(true);
  }

  signIn(signInfo: SignInfo): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(signInfo.email, signInfo.pw)
      .then(userCredential => {

        const user = userCredential.user;

        const userDocRef = this.userService.getUserDoc(user.uid);
        return userDocRef.get().then(userDoc => {
          
          let userInfo: UserInfo = null;
          
          if(userDoc.exists) {
            userInfo = userDoc.data() as UserInfo;

            if(userInfo.ad) {
              userInfo.uid = user.uid;
              userInfo.email = user.email;
              userInfo.emailVerified = user.emailVerified;
              userInfo.pw = signInfo.pw;
              userInfo.lastDate = new Date();

              this.storage.set('savedId', user.email);
              this.userService.updateUser(userInfo);

              resolve(user);
            } else {
              reject("Forbidden")
            }
          } else {reject("User not exists!");}
        }).catch(error => reject("User query faild!"));
      }).catch(error => reject("Login failed!"));
    });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
