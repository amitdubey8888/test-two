import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Storage } from '@ionic/storage';
import { AngularFireAuth} from 'angularfire2/auth';
import { WelcomePage } from '../welcome/welcome';
import { UserDetails } from '../../modal/users/user.interface';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userDetails = {} as UserDetails;
  userDetailsRef$: FirebaseListObservable<UserDetails[]>;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController , private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.userDetailsRef$ = this.database.list('user-details');
  }
  
  async signup(userDetails: UserDetails){
      try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.userDetails.userEmail, this.userDetails.userPassword);
        if(result.email != ''){
          console.log(result.email);
          this.userDetailsRef$.push({
             userName:this.userDetails.userName,
             userEmail:this.userDetails.userEmail,
             userPassword:this.userDetails.userPassword,
             userPhone:this.userDetails.userPhone,
             userAddress:this.userDetails.userAddress,
             userState:this.userDetails.userState,
             userCity:this.userDetails.userCity
          });
          this.storage.set('userData', this.userDetails);
          const alert = this.alertCtrl.create({
            title: 'Signup Successfull!',
            subTitle: 'Your account has been created successfully!',
            buttons: ['Ok']
          });
          if(alert.present()){
             this.userDetails = {} as UserDetails;
             this.navCtrl.setRoot(WelcomePage);
          }
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: 'Signup Failed!',
            subTitle: 'Something went wrong.',
            buttons: ['Ok']
          });
          if(alert.present()){
            this.navCtrl.setRoot(WelcomePage);
         }
        }
      }
      catch(error){
        const alert = this.alertCtrl.create({
          title: 'Signup Failed!',
          subTitle: error.message,
          buttons: ['Ok']
        });
        if(alert.present()){
          this.navCtrl.setRoot(WelcomePage);
       }
      }
  }
}
