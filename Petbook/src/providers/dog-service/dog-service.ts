import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HelperServiceProvider} from "../helper-service/helper-service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

/*
  Generated class for the DogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DogServiceProvider {

    constructor(public http: HttpClient,
                public helper: HelperServiceProvider) {
    }

    getAllItems(): Observable<object[]> {
        return this.http.get(`${this.helper.baseUrl}/dogs`).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        );
    }

    deleteDog(id) {
        return this.http.delete(`${this.helper.baseUrl}/dogs/${id}`).pipe(
            map(this.helper.extractData),
            catchError(this.helper.handleError)
        ).toPromise();
    }

    createDog(data) {
        return this.http.post(`${this.helper.baseUrl}/dogs`, data)
            .pipe(
                map(this.helper.extractData),
                catchError(this.helper.handleError))
            .toPromise()
            .then((data) => {
                return data;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    editDog(id, data) {
        return this.http.put(`${this.helper.baseUrl}/dogs/${id}`, data)
            .pipe(
                map(this.helper.extractData),
                catchError(this.helper.handleError))
            .toPromise()
            .then(data => {
                return data;
            })
            .catch(err => {
                console.log(err)
                throw err;
            });
    }

}
