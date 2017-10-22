import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth} from 'angularfire2/auth';
import { UserDetails } from '../../modal/users/user.interface';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  loginForm: FormGroup;

  userDetails = {} as UserDetails;
  loginerror:any;
  
  constructor(public formBuilder: FormBuilder, public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private afAuth: AngularFireAuth) {
   
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  
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

}
