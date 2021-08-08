import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {DogsPage} from "../pages/dogs/dogs";
import {DogDetailsPage} from "../pages/dog-details/dog-details";
import {DogAddPage} from "../pages/dog-add/dog-add";
import {ServicesPage} from '../pages/services/services';
import {ReviewsPage} from '../pages/reviews/reviews';
import {GalleryPage} from "../pages/gallery/gallery";
import {LoginPage} from "../pages/login/login";
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GalleryServiceProvider} from '../providers/gallery-service/gallery-service';
import {DogServiceProvider} from '../providers/dog-service/dog-service';
import {HttpClientModule} from '@angular/common/http';
import {HelperServiceProvider} from '../providers/helper-service/helper-service';
import {Vibration} from "@ionic-native/vibration";
import {LoginPageModule} from "../pages/login/login.module";
import {AboutPageModule} from "../pages/about/about.module";
import {DogsPageModule} from "../pages/dogs/dogs.module";
import {DogAddPageModule} from "../pages/dog-add/dog-add.module";
import {DogDetailsPageModule} from "../pages/dog-details/dog-details.module";
import {ServicesPageModule} from "../pages/services/services.module";
import {ReviewsPageModule} from "../pages/reviews/reviews.module";
import {GalleryPageModule} from "../pages/gallery/gallery.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {RegisterPage} from "../pages/register/register";
import {ReviewServiceProvider} from '../providers/review-service/review-service';
import {UserAuthServiceProvider} from '../providers/user-auth-service/user-auth-service';
import {TabsPage} from "../pages/tabs/tabs";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file"
import {CameraServiceProvider} from '../providers/camera-service/camera-service';
import {PostsPageModule} from "../pages/posts/posts.module";
import {PendingReviewsPageModule} from "../pages/pending-reviews/pending-reviews.module";
import {PostsPage} from "../pages/posts/posts";
import {PendingReviewsPage} from "../pages/pending-reviews/pending-reviews";
import {PendingReviewServiceProvider} from '../providers/pending-review-service/pending-review-service';
import {PostServiceProvider} from '../providers/post-service/post-service';
import {PostDetailsPageModule} from "../pages/post-details/post-details.module";
import {PostDetailsPage} from "../pages/post-details/post-details";
import {PostAddPageModule} from "../pages/post-add/post-add.module";
import {PostAddPage} from "../pages/post-add/post-add";
import {DogEditPageModule} from "../pages/dog-edit/dog-edit.module";
import {DogEditPage} from "../pages/dog-edit/dog-edit";
import {EmailComposer} from "@ionic-native/email-composer";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        AboutPageModule,
        DogsPageModule,
        DogDetailsPageModule,
        DogAddPageModule,
        DogEditPageModule,
        ServicesPageModule,
        ReviewsPageModule,
        GalleryPageModule,
        LoginPageModule,
        RegisterPageModule,
        PostsPageModule,
        PostDetailsPageModule,
        PostAddPageModule,
        PendingReviewsPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        DogsPage,
        DogDetailsPage,
        DogAddPage,
        DogEditPage,
        ServicesPage,
        ReviewsPage,
        GalleryPage,
        LoginPage,
        RegisterPage,
        TabsPage,
        ListPage,
        PostsPage,
        PostDetailsPage,
        PostAddPage,
        PendingReviewsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        GalleryServiceProvider,
        DogServiceProvider,
        HelperServiceProvider,
        Vibration,
        ReviewServiceProvider,
        UserAuthServiceProvider,
        Camera,
        File,
        CameraServiceProvider,
        PendingReviewServiceProvider,
        PostServiceProvider,
        EmailComposer
    ]
})
export class AppModule {
}
