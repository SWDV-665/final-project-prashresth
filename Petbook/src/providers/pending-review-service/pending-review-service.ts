import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {HelperServiceProvider} from "../helper-service/helper-service";

/*
  Generated class for the PendingReviewServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PendingReviewServiceProvider {

    constructor(public http: HttpClient,
                public helper: HelperServiceProvider) {
    }

    getAllItems() {
        return this.http.get(`${this.helper.baseUrl}/reviews/pending`).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        ).toPromise()
    }

    getById(id) {
        return this.http.get(`${this.helper.baseUrl}/reviews/pending/${id}`).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        ).toPromise();
    }

    delete(id) {
        return this.http.delete(`${this.helper.baseUrl}/reviews/pending/${id}`).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        ).toPromise();
    }

    approve(id) {
        // approve reviews endpoint does not take a body in the request.
        return this.http.post(`${this.helper.baseUrl}/reviews/pending/${id}`, null).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        ).toPromise();
    }

}
