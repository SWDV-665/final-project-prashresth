import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  fullName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public helper: HelperServiceProvider,
              public alert: AlertController) {
  }

  async ionViewDidLoad() {
    const loading = this.helper.createSpinner(300)
    await loading.present();
  }

  async register() {
    if (this.fullName == null
      || this.email == null
      || this.username == null
      || this.password == null
      || this.confirmPassword == null
    ) {
        await this.registerError("Please fill in all the fields.")
    }
    else if (this.password !== this.confirmPassword) {
      await this.registerError("Password and Confirm Password do not match.")
    }
    else {
      console.log('Registration should succeed now!')
      const alert = this.alert.create({
        title: "Coming Soon!",
        subTitle: "We are hard at work to make this features available to you.",
        buttons: [{
          text: "Ok",
          handler: () => {}
        }]
      });
      await alert.present();
    }
  }

  async registerError(message) {
    const toast = this.helper.createToast(
      message,
      "toast-danger"
    )
    await toast.present()
  }

}
