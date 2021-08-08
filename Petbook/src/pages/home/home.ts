import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesPage } from '../services/services'
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public helper: HelperServiceProvider) {

  }

  async ionViewDidLoad() {
    const loading = this.helper.createSpinner(300)
    await loading.present();
  }

  goToServicesPage() {
    this.navCtrl.push(ServicesPage);
  }

}
