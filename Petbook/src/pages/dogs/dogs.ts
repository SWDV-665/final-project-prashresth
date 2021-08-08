import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, App, MenuController} from 'ionic-angular';
import {DogServiceProvider} from "../../providers/dog-service/dog-service";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {DogDetailsPage} from "../dog-details/dog-details";
import {DogAddPage} from "../dog-add/dog-add";

@IonicPage()
@Component({
    selector: 'page-dogs',
    templateUrl: 'dogs.html',
})
export class DogsPage {

    listings: {
        _id: string,
        name: string,
        image: string,
        breed: string,
        gender: string
    } [];

    searchQuery: string = '';
    items: any;

    errorMessage: string;

    constructor(public navCtrl: NavController,
                public app: App,
                public navParams: NavParams,
                public menuCtrl: MenuController,
                public dogService: DogServiceProvider,
                public helper: HelperServiceProvider) {
    }

    async ionViewDidLoad() {
        try {
            const loading = this.helper.createSpinner(null, 'Getting all members...');
            await loading.present();
            let data = await this.loadItems();
            await loading.dismiss(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    ionViewWillEnter() {
        // don't want the side swipe feature available while logged in
        this.menuCtrl.swipeEnable(false);
    }

    loadItems() {
        // create a new Promise and subscribe. Resolve after we get data and return a promise
        // just a personal preference.
        return new Promise((resolve, reject) => {
            this.dogService.getAllItems()
                .subscribe(
                    data => {
                        this.listings = data['listings']
                        this.initializeItems();
                        resolve(data)
                    },
                    error => {
                        console.log(error)
                        this.errorMessage = <any>error
                        reject(error)
                    }
                );
        });
    }

    logout() {
        this.helper.logout();
    }

    details(listing) {
        this.navCtrl.push(DogDetailsPage, {listing: listing, hide: false})
    }

    // this is only a nice feature to have when you load all documents all at once.
    // this would not work if you decided to use pagination.
    // switch to making POST request for searches if pagination is implemented in the future.
    searchDog(ev: any) {
        // // Reset items back to all of the items
        this.initializeItems();

        // set val to the value of the searchbar
        const val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    initializeItems() {
        this.items = this.listings;
    }

    addDog() {
        this.navCtrl.push(DogAddPage);
    }

}
