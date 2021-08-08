import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DogsPage} from "../dogs/dogs";

/**
 * Generated class for the PostDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-post-details',
    templateUrl: 'post-details.html',
})
export class PostDetailsPage {

    post: {
        title: string,
        image: string,
        content: string
    };
    hide;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.post = navParams.get('post');
        this.hide = navParams.get('hide') ? navParams.get('hide') : false;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad PostDetailsPage');
    }

    async goToList() {
        await this.navCtrl.setRoot(DogsPage);
    }

}
