import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  
  signupPage(){
    this.navCtrl.push(SignupPage);
  }

  loginPage(){
     this.navCtrl.push(LoginPage);
  }
}
