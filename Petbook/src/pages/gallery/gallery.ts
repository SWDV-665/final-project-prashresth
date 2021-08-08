import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {GalleryServiceProvider} from "../../providers/gallery-service/gallery-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-gallery',
    templateUrl: 'gallery.html',
})
export class GalleryPage {

    images: {
        message: string,
        breed: string
    } [];

    errorMessage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public galleryService: GalleryServiceProvider,
                public helper: HelperServiceProvider) {
    }

    async ionViewDidLoad() {
        const loading = this.helper.createSpinner()
        await loading.present().then(() => {
            this.loadItems().then(data => {
                loading.dismiss(data)
            });
        })
    }

    loadItems(refresher?: any) {
        return new Promise((resolve, reject) => {
            this.galleryService.getAllItems()
                .subscribe(
                    images => {
                        this.images = images['data'].images
                        resolve(images)
                    },
                    error => {
                        this.errorMessage = <any>error
                        reject(error)
                    },
                    () => {
                        if (refresher) {
                            refresher.complete();
                        }
                    }
                );
        });
    }

    refreshPage() {
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }

    async doRefresh(event) {
        this.helper.vibrate(1000);
        await this.loadItems(event);
    }

}
