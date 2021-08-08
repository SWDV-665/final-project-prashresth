import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {ReviewServiceProvider} from "../../providers/review-service/review-service";

/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reviews',
    templateUrl: 'reviews.html',
})
export class ReviewsPage {

    reviews: {
        image: string,
        message: string,
        name: string,
        registered: string
    } [];

    errorMessage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public helper: HelperServiceProvider,
                public reviewService: ReviewServiceProvider) {
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
            this.reviewService.getAllItems()
                .subscribe(
                    reviews => {
                        this.reviews = reviews['data']
                        resolve(reviews)
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

    async doRefresh(event) {
        this.helper.vibrate(1000);
        await this.loadItems(event);
    }

}
