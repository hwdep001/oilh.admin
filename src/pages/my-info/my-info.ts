import { Component } from '@angular/core';

import { CommonProvider } from './../../providers/Common';
import { AuthProvider } from './../../providers/Auth';
import { UserProvider } from './../../providers/User';

import { UserInfo } from './../../models/UserInfo';

@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {

  public userInfo: UserInfo = new UserInfo();

  constructor(
    private cmnService: CommonProvider,
    private authService: AuthProvider,
    private userService: UserProvider
  ) {
    
  }

  ionViewDidLoad() { 
    const loader = this.cmnService.getLoader();
    loader.present();

    this.getUserInfo().then(() => {
      loader.dismiss();
    }).catch(err => {
      loader.dismiss();
      console.log(err);
      alert(JSON.stringify(err));
    });
  }

  getUserInfo(): Promise<void> {
    let userDocRef = this.userService.getUserDoc(this.authService.uid);
    return userDocRef.get().then(doc => {
      if(doc.exists) {
        this.userInfo = doc.data() as UserInfo;
      }
    });
  }

  signOut(): void {
    const loader = this.cmnService.getLoader();
    loader.present();

    this.authService.signOut();
    loader.dismiss();
  }
}
