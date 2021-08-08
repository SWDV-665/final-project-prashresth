import {Component} from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {PendingReviewServiceProvider} from "../../providers/pending-review-service/pending-review-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

/**
 * Generated class for the PendingReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-pending-reviews',
    templateUrl: 'pending-reviews.html',
})
export class PendingReviewsPage {

    reviews: {
        _id: string,
        image: string,
        message: string,
        name: string,
        created: string
    } [] = [];

    errorMessage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public menuCtrl: MenuController,
                public helper: HelperServiceProvider,
                private pendingReviewService: PendingReviewServiceProvider) {
    }

    ionViewWillEnter() {
        this.menuCtrl.swipeEnable(false);
    }

    async ionViewCanEnter() {
        try {
            const loading = this.helper.createSpinner(null, 'Gathering pending reviews...')
            await loading.present()
            let data = await this.loadItems()
            await loading.dismiss(data)
        } catch (err) {
            console.log(err)
        }
    }

    loadItems(refresher?: any) {
        return this.pendingReviewService.getAllItems().then(res => {
            this.reviews = res['data'];
            if (refresher) {
                refresher.complete();
            }
            return res;
        }).catch(err => {
            console.log(err)
            this.errorMessage = err;
        });
    }

    async discard(id) {
        try {
            const loading = this.helper.createSpinner(null, 'Deleting review...')
            await loading.present();
            await this.pendingReviewService.delete(id);
            await loading.dismiss();
            const toast = this.helper.createToast(
                'Review deleted successfully.',
                'toast-success'
            );
            await toast.present();
            await this.loadItems();
            // uncomment to go to top after re-load
            // I do not think it is necessary in this scenario since it adds
            // more scrolling if some discards/approves (line 90) a review that's
            // not the first one.
            // await this.navCtrl.setRoot(this.navCtrl.getActive().component);
        } catch (err) {
            console.log(err)
            await this.helper.createErrorToast();
        }
    }

    async approve(id) {
        try {
            const loading = this.helper.createSpinner(null, 'Approving review...')
            await loading.present();
            await this.pendingReviewService.approve(id)
            await loading.dismiss();
            const toast = this.helper.createToast(
                'Review approved successfully.\nIt will be displayed on the reviews page.',
                'toast-success',
                3000
            );
            await toast.present();
            await this.loadItems();
            // uncomment to go to top after re-load
            // await this.navCtrl.setRoot(this.navCtrl.getActive().component);
        } catch (err) {
            console.log(err);
            await this.helper.createErrorToast();
        }
    }

    async doRefresh(event) {
        this.helper.vibrate(1000);
        await this.loadItems(event);
    }

    logout() {
        this.helper.logout();
    }

}
