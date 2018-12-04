import { Injectable } from '@angular/core';
import firebase from 'firebase/app'

import { UserInfo } from './../models/UserInfo';
import { CollectionReference, DocumentReference } from '@angular/fire/firestore';

@Injectable()
export class UserProvider {

  private usersCol: CollectionReference;

  constructor(
  ) {
    this.usersCol = firebase.firestore().collection("users");
  }

  updateUser(userInfo: UserInfo): Promise<void> {
    return this.usersCol.doc(userInfo.uid)
      .update(Object.assign({}, userInfo));
  }

  updateLastDateUser(uid: string): Promise<void> {
    return this.usersCol.doc(uid)
      .update({lastDate: new Date()});
  }

  getUserDoc(uid: string): DocumentReference {    
    return this.usersCol.doc(uid);
  }

}
