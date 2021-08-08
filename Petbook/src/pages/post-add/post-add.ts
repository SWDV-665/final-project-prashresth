import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {CameraServiceProvider} from "../../providers/camera-service/camera-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {PostServiceProvider} from "../../providers/post-service/post-service";
import {PostDetailsPage} from "../post-details/post-details";

@IonicPage()
@Component({
    selector: 'page-post-add',
    templateUrl: 'post-add.html',
})
export class PostAddPage {

    imgUrl;
    postTitle: string;
    postContent: string;
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public http: HttpClient,
                private cameraService: CameraServiceProvider,
                private helper: HelperServiceProvider,
                private postService: PostServiceProvider) {
    }

    async ionViewDidLoad() {
        const loading = this.helper.createSpinner( 300)
        await loading.present();
    }

    async getCamera() {
        this.imgUrl = await this.cameraService.getCamera();
    }

    async getGallery() {
        this.imgUrl = await this.cameraService.getGallery();
    }

    async savePost() {
        let loading;
        try {
            let contentToPost = '';
            loading = this.helper.createSpinner(null,'Creating post...')
            // have to validate incoming data to be able to manipulate it below
            this.validatePost()
            // hack to get some html formatting since there is no component for rich text editor in ionic
            this.postContent.split('\n').forEach(line => {
                if (line !== '') {
                    contentToPost += `<p>${line}</p>`
                }
            });
            const postToCreate = {
                image: this.imgUrl,
                title: this.postTitle,
                content: contentToPost
            }
            loading.present()
            let data = await this.postService.createPost(postToCreate)
            await loading.dismiss(data);
            await this.navCtrl.push(PostDetailsPage, {post: data, hide: true})
            const toast = this.helper.createToast(
                'New post created successfully.\nWill be displayed in the posts page',
                "toast-success",
                3000
            )
            await toast.present();
        }
        catch (err) {
            await loading.dismiss();
            const toast = this.helper.createToast(
                `Error: ${err}.`,
                "toast-danger",
                3000
            )
            await toast.present();
        }
    }

    validatePost() {
        if (!this.postContent || !this.postContent) {
            throw `Post title and content is required`;
        }
        if (this.helper.isAllWhiteSpace(this.postTitle) || this.helper.isAllWhiteSpace(this.postContent)) {
            throw `Post title and content cannot be all spaces`;
        }
    }

    logout() {
        this.helper.logout();
    }

}
