import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  email:any='';
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {

    this.storage.get('userData').then((data) => {
      this.email = data;
      if(this.email != null){
        this.navCtrl.setRoot(WelcomePage);
      }
   });

  }

  signupPage(){
    this.navCtrl.push(SignupPage);
  }

  loginPage(){
     this.navCtrl.push(LoginPage);
  }
}
