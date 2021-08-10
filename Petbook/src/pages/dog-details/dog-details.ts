import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {DogServiceProvider} from "../../providers/dog-service/dog-service";
import {DogsPage} from "../dogs/dogs";
import {DogEditPage} from "../dog-edit/dog-edit";

@IonicPage()
@Component({
  selector: 'page-dog-details',
  templateUrl: 'dog-details.html',
})
export class DogDetailsPage {

  hide;
  listing: {
    _id: string,
    name: string,
    image: string,
    breed: string,
    gender: string,
    age: number
    owner: {
      name: string,
      email: string,
      phone: string,
      address: string,
    }
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public helper: HelperServiceProvider,
              public dogService: DogServiceProvider) {
    this.listing = navParams.get('listing');
    this.hide = navParams.get('hide');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogDetailsPage');
  }

  async deleteDog(id) {
    const loading = this.helper.createSpinner(null, 'Deleting member...')
    await loading.present().then(() => {
      return this.dogService.deleteDog(id)
    }).then(data => {
      loading.dismiss(data);
      const toast = this.helper.createToast(
        `Dog record deleted successfully.`,
        "toast-success"
      )
      toast.present();
      this.navCtrl.setRoot(DogsPage);
    }).catch(err => {
      const toast = this.helper.createToast(
        `Something went wrong.\nPlease try again.`,
        "toast-danger"
      )
      toast.present();
    });
  }

  async goToList() {
    await this.navCtrl.setRoot(DogsPage);
  }

  async editDog(listing) {
      await this.navCtrl.push(DogEditPage, {listing: listing});
  }

}
