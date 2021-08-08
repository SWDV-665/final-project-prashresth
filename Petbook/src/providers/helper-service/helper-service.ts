import {Injectable} from '@angular/core';
import {App, LoadingController, MenuController, ToastController} from "ionic-angular";
import {Vibration} from "@ionic-native/vibration";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../../pages/home/home";
import {EmailComposer} from "@ionic-native/email-composer";

@Injectable()
export class HelperServiceProvider {

    baseUrl = 'https://groceriesswdv655.herokuapp.com/api';
    // baseUrl = 'http://localhost:54321/api';

    constructor(public spinner: LoadingController,
                public vibration: Vibration,
                public toastCtrl: ToastController,
                public emailComposer: EmailComposer,
                public menuCtrl: MenuController,
                public app: App) {

    }

    public extractData(res: Response) {
        return res || {};
    }

    public handleError(error: Response | any) {
        console.log(JSON.stringify(error))
        let errMsg: string;
        if (error instanceof HttpErrorResponse) {
            // may have to play around with this to improve error logging but okay for now...
            // const err = error || '';
            errMsg = `${error.error ? error.error[0]['message'] : error.toString() || ''}`
        } else {
            errMsg = error.error.message ? error.error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }

    createSpinner(duration?, message = 'Loading...') {
        if (duration) {
            return this.spinner.create({
                duration: duration,
                content: message,
                spinner: "bubbles",
                showBackdrop: true,
                enableBackdropDismiss: false
            });
        } else {
            return this.spinner.create({
                content: message,
                spinner: "bubbles",
                showBackdrop: true,
                enableBackdropDismiss: false
            });
        }
    }

    vibrate(seconds = 1000) {
        this.vibration.vibrate(seconds);
    }

    createToast(message, cssClass, duration?) {
        return this.toastCtrl.create({
            message: message,
            duration: duration ? duration : 2000,
            cssClass: cssClass
        });
    }

    async createErrorToast() {
        const toast = this.createToast(
            `Something went wrong.\nPlease try again.`,
            "toast-danger"
        )
        await toast.present();
    }

    /*
    * Helper method to test loading indicators
    * Usage: this.helper.wait(10000)
    */
    wait(ms) {
        let start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    }

    logout() {
        // not using this since it throws a warning
        /*
        * (getRootNav) is deprecated and will be removed in the next major release.
        *  Use getRootNavById instead.
        */
        // this.app.getRootNav().setRoot(HomePage);

        // using this instead
        this.menuCtrl.swipeEnable(true);
        this.app.getRootNavs()[0].setRoot(HomePage)
    }

    isAllWhiteSpace(input) {
        return input.trim().length === 0;
    }

    async sendEmail(body) {
        try {
            let email = {
                to: 'happypawsswdv655@gmail.com',
                cc: [],
                bcc: [],
                attachments: [],
                subject: 'Looking for more info.',
                body: body,
                isHtml: true
            };
            await this.emailComposer.open(email);
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    }

}
