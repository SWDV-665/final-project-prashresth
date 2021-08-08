import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {PostServiceProvider} from "../../providers/post-service/post-service";
import {PostDetailsPage} from "../post-details/post-details";
import {Vibration} from "@ionic-native/vibration";

/**
 * Generated class for the PostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-posts',
    templateUrl: 'posts.html',
})
export class PostsPage {

    posts: {
        image: string,
        content: string,
        title: string
    } [];

    errorMessage: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public helper: HelperServiceProvider,
                private postService: PostServiceProvider,
                public vibration: Vibration) {
    }

    async ionViewDidLoad() {
        try {
            const loading = this.helper.createSpinner();
            await loading.present();
            let data = await this.loadItems();
            await loading.dismiss(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    async loadItems(refresher?: any) {
        return this.postService.getAllItems().then(res => {
            this.posts = res['data'];
            if (refresher) {
                refresher.complete();
            }
            return res;
        }).catch(err => {
            console.log(err)
            this.errorMessage = err;
        });
    }

    openDetails(post) {
        this.navCtrl.push(PostDetailsPage, {post: post})
    }

    async doRefresh(event) {
        this.helper.vibrate(1000);
        await this.loadItems(event);
    }

}
