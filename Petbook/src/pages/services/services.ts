import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";

@IonicPage()
@Component({
    selector: 'page-services',
    templateUrl: 'services.html',
})
export class ServicesPage {

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public helper: HelperServiceProvider) {
    }

    async ionViewDidLoad() {
        const loading = this.helper.createSpinner(300)
        await loading.present()
    }

    goToAboutPage() {
        this.navCtrl.push(AboutPage);
    }

    async openEmail() {
        try {
            let body = 'Hello.\nI am looking for some information about the services you provide. Please call me at 911 at your earliest convenience lol.\nThanks';
            await this.helper.sendEmail(body);
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    }

}
