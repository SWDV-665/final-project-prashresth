import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {HelperServiceProvider} from "../../providers/helper-service/helper-service";
import {RegisterPage} from "../register/register";
import {UserAuthServiceProvider} from "../../providers/user-auth-service/user-auth-service";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    USER = "user";
    PASS = "pass";
    email: string;
    password: string;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public helper: HelperServiceProvider,
                public alert: AlertController,
                private userAuth: UserAuthServiceProvider) {
    }

    async ionViewDidLoad() {
        const loading = this.helper.createSpinner(300)
        await loading.present();
    }

    async login() {
        if (this.email == null || this.password == null) {
            return await this.loginFailure(`Username and Password are required.`)
        }
        const alert = this.alert.create({
            title: "Acknowledgement",
            subTitle: "<p>\n" +
                "              By clicking the Ok button you acknowledge that you are an active employee of Happy Paws and have a valid \n" +
                "              login credentials. \n" +
                "          </p>\n" +
                "          <p>\n" +
                "              Please click Cancel if you clicked the Employee Login by accident.<br>\n" +
                "          </p>",
            buttons: [
                {
                    text: "Cancel",
                    handler: () => {
                    }
                },
                {
                    text: "Ok",
                    handler: () => {
                        this.proceedWithLogin()
                    }
                }]
        });
        await alert.present();
    }

    async proceedWithLogin() {
        const loading = this.helper.createSpinner(null, 'Logging in...')
        await loading.present();
        this.userAuth.login(this.email).then(user => {
            if (this.password === user.data[0].password) {
                this.loginSuccess(user.data[0].username)
                loading.dismiss();
            } else {
                this.loginFailure(`Username or Password is incorrect.\n Please try again.`)
                loading.dismiss();
            }
        }).catch(err => {
            console.log(err)
            this.loginFailure(`Username or Password is incorrect.\n Please try again.`)
            loading.dismiss();
        });
    }

    async loginSuccess(username) {
        await this.navCtrl.setRoot(TabsPage);
        const toast = this.helper.createToast(
            `Logged in successfully. Welcome ${username}`,
            "toast-success"
        )
        await toast.present();
    }

    async loginFailure(message) {
        const toast = this.helper.createToast(
            message,
            "toast-danger"
        )
        await toast.present();
    }

    register() {
        this.navCtrl.push(RegisterPage)
    }

}
