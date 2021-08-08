import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HelperServiceProvider} from "../helper-service/helper-service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

/*
  Generated class for the UserAuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserAuthServiceProvider {

  constructor(public http: HttpClient,
              public helper: HelperServiceProvider) {
    console.log('Hello UserAuthServiceProvider Provider');
  }

  login(email) {
    console.log(`${this.helper.baseUrl}/users/email?email=${encodeURIComponent(email)}`)
    return this.http.get(`${this.helper.baseUrl}/users/email?email=${encodeURI(email)}`).pipe(
      map(this.helper.extractData),
      catchError(this.helper.handleError)
    ).toPromise().then(data => {
      return data;
    });
  }

  register(data): Observable<object[]> {
    return this.http.post(`${this.helper.baseUrl}/users`, data).pipe(
      map(this.helper.extractData),
      catchError(this.helper.handleError)
    );
  }

}
