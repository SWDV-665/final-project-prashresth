import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DogServiceProvider} from "../../providers/dog-service/dog-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {CameraServiceProvider} from "../../providers/camera-service/camera-service";
import {DogsPage} from "../dogs/dogs";
import {DogDetailsPage} from "../dog-details/dog-details";

@IonicPage()
@Component({
    selector: 'page-dog-edit',
    templateUrl: 'dog-edit.html',
})
export class DogEditPage {

    imgUrl;
    listing: {
        _id: string,
        name: string,
        image: string,
        breed: string,
        gender: string,
        age: number,
        owner: {
            name: string,
            email: string,
            phone: string,
            address: string,
        }
    };

    dogName: string;
    breed: string;
    age: number;
    gender: string;
    ownerName: string;
    email: string;
    phone: string;
    address: string;

    constructor
    (
        public navCtrl: NavController,
        public navParams: NavParams,
        private cameraService: CameraServiceProvider,
        private dogService: DogServiceProvider,
        private helper: HelperServiceProvider
    ) {
        this.listing = navParams.get('listing');
        this.imgUrl = this.listing['image'];
        this.dogName = this.listing['name'];
        this.breed = this.listing['breed'];
        this.age = this.listing['age'];
        this.gender = this.listing['gender'];
        this.ownerName = this.listing['owner']['name'];
        this.email = this.listing['owner']['email'];
        this.phone = this.listing['owner']['phone'];
        this.address = this.listing['owner']['address'];
    }

    ionViewDidLoad() {
    }

    async getCamera() {
        try {
            this.imgUrl = await this.cameraService.getCamera();
            console.log('image should be set')
        }
        catch (err) {
            console.log(err)
        }
    }

    async getGallery() {
        this.imgUrl = await this.cameraService.getGallery();
        console.log('image should be set')
    }

    async saveDog(id) {
        let loading;
        try {
            loading = this.helper.createSpinner(null, 'Updating member details...')
            loading.present();
            const dataToUpdate = {
                image: this.imgUrl,
                name: this.dogName,
                breed: this.breed,
                age: this.age,
                gender: this.gender,
                owner: {
                    name: this.ownerName,
                    email: this.email,
                    phone: this.phone,
                    address: this.address
                }
            };
            console.log(dataToUpdate)
            const updatedData = await this.dogService.editDog(id, dataToUpdate);
            await loading.dismiss(updatedData);
            await this.navCtrl.push(DogDetailsPage, {listing: updatedData, hide: true})
            const toast = this.helper.createToast(
                'Member details updated successfully!',
                "toast-success",
                3000
            )
            await toast.present();
        } catch (err) {
            await loading.dismiss();
            const toast = this.helper.createToast(
                `Error: ${err}.`,
                "toast-danger",
                3000
            )
            await toast.present();
        }
    }

    async goToList() {
        await this.navCtrl.setRoot(DogsPage);
    }

}
