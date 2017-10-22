import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth} from 'angularfire2/auth';
import { UserDetails } from '../../modal/users/user.interface';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  userDetails = {} as UserDetails;
  loginerror:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {
  }
  
  async login(userDetails: UserDetails){
    try
    {
       const result = this.afAuth.auth.signInWithEmailAndPassword(this.userDetails.userEmail, this.userDetails.userPassword);
      if(result){
         this.navCtrl.setRoot(WelcomePage);
      }
      else
      {
        this.alertCtrl.create({
          title: 'Login Failed',
          subTitle: 'Your email or password is incorrect!',
          buttons: ['Dismiss']
        }).present();
        this.navCtrl.setRoot(HomePage);
      }       
    }
    catch(e)
    {
      this.alertCtrl.create({
        title: 'Login Failed',
        subTitle: 'Your email or password is incorrect!',
        buttons: ['Dismiss']
      }).present();
      this.navCtrl.setRoot(HomePage);
    }
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }
  
}
