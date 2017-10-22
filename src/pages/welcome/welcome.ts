import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserDetails } from '../../modal/users/user.interface';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  users: FirebaseListObservable<any[]>;
  userDetails:any;
  userName:any;
  userEmail:any;
  userPhone:any;
  userAddress:any;   
  userState:any;
  userCity:any;
  
  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.users = database.list('/user-details');
    console.log(this.users);
    // this.users.subscribe(x=>console.log(x));
    this.storage.get('userData').then((data) => {
      this.userDetails = data;
      this.userName = this.userDetails['userName'];
      this.userEmail = this.userDetails['userEmail'];
      this.userPhone = this.userDetails['userPhone'];
      this.userAddress = this.userDetails['userAddress'];
      this.userState = this.userDetails['userState'];
      this.userCity = this.userDetails['userCity'];
   });
  }
  
  ionViewWillLoad(){
      this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.toast.create({
           message: 'Welcome back '+data.email+'',
           duration: 5000
        }).present();
      }
      else{
        this.toast.create({
          message: 'Could not find authentication.',
          duration: 5000
        }).present();
        this.navCtrl.setRoot(HomePage);
      }
    });
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
    this.storage.clear();
  }
}
