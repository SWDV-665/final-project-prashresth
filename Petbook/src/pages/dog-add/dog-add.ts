import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CameraServiceProvider} from "../../providers/camera-service/camera-service";
import {DogServiceProvider} from "../../providers/dog-service/dog-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {DogDetailsPage} from "../dog-details/dog-details";


@IonicPage()
@Component({
    selector: 'page-dog-add',
    templateUrl: 'dog-add.html',
})
export class DogAddPage {

    imgUrl;
    dogName: string;
    breed: string;
    age: number;
    gender: string;
    ownerName: string;
    email: string;
    phone: string;
    address: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private cameraService: CameraServiceProvider,
                private dogService: DogServiceProvider,
                private helper: HelperServiceProvider) {
    }

    ionViewDidLoad() {
    }

    async getCamera() {
        this.imgUrl = await this.cameraService.getCamera();
        console.log('image should be set')
    }

    async getGallery() {
        this.imgUrl = await this.cameraService.getGallery();
        console.log('image should be set')
    }

    async saveDog() {
        const loading = this.helper.createSpinner(null, 'Creating new member...')
        let postData = new FormData();
        const dataToSave = {
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
        }
        // promise chaining below - use of form to post data - backend expects a form in the request
        // savePost() in post-add.ts uses async/await strictly.
        postData.append('image', this.imgUrl);
        postData.append('data', JSON.stringify(dataToSave));
        loading.present().then(() => {
            return this.dogService.createDog(postData);
        }).then(res => {
            loading.dismiss(res)
            this.navCtrl.push(DogDetailsPage, {listing: res, hide: true})
            const toast = this.helper.createToast(
                `New member ${res.name.toUpperCase()} added successfully.`,
                "toast-success"
            )
            toast.present();
        }).catch(err => {
            loading.dismiss();
            const toast = this.helper.createToast(
                `Error: ${err}.`,
                "toast-danger",
                3000
            )
            toast.present();
        })
    }
}
