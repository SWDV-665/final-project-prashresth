import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HelperServiceProvider} from "../helper-service/helper-service";
import {catchError, map} from "rxjs/operators";

/*
  Generated class for the PostServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostServiceProvider {

    constructor(public http: HttpClient,
                public helper: HelperServiceProvider) {
    }

    getAllItems() {
        return this.http.get(`${this.helper.baseUrl}/posts`)
            .pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
            )
            .toPromise();
    }

    createPost(data) {
        return this.http.post(`${this.helper.baseUrl}/posts`, data)
            .pipe(
                map(this.helper.extractData),
                catchError(this.helper.handleError)
            ).toPromise().then((data) => {
                return data;
            }).catch(err => {
                console.log(err);
                throw err;
            });
    }

}
