import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { storage } from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserDetails } from '../../modal/users/user.interface';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {
  users: FirebaseListObservable<UserDetails[]>;
  userDetails:any='';
  name:any='';
  email:any='';
  phone:any='';
  address:any='';   
  state:any='';
  city:any='';
  userName:string;
  userEmail:string;
  userPassword:string;
  userPhone:string;
  userAddress:string;
  userState:string;
  userCity:string;
  constructor(private camera:Camera, private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, private database: AngularFireDatabase, private afAuth: AngularFireAuth) {
    
    this.users = database.list('user-details');

    this.storage.get('userData').then((data) => {
      this.userDetails = data;
      if(this.userDetails != null){
      if(this.userDetails['userName'] != ''){ this.name = this.userDetails['userName'];}
      if(this.userDetails['userEmail'] != ''){ this.email = this.userDetails['userEmail'];}
      if(this.userDetails['userPhone'] != ''){ this.phone = this.userDetails['userPhone'];}
      if(this.userDetails['userAddress'] != ''){ this.address = this.userDetails['userAddress'];}
      if(this.userDetails['userState'] != ''){ this.state = this.userDetails['userState'];}
      if(this.userDetails['userCity'] != ''){ this.city = this.userDetails['userCity'];}
      }
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
  takePhoto(){
    const options: CameraOptions = {
      
    }
  }
  logout(){
    this.navCtrl.setRoot(HomePage);
  }
}
