import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../environments/environment';

import { CommonProvider } from './../providers/Common';
import { AuthProvider } from './../providers/Auth';
import { UserProvider } from './../providers/User';

import { MyApp } from './app.component';
import { SignInPage } from './../pages/sign-in/sign-in';
import { MyInfoPage } from './../pages/my-info/my-info';

@NgModule({
  declarations: [
    MyApp,
    SignInPage,
    MyInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top', scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignInPage,
    MyInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CommonProvider,
    AuthProvider,
    UserProvider
  ]
})
export class AppModule {}
