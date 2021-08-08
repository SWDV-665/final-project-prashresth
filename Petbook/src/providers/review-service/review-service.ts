import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {HelperServiceProvider} from "../helper-service/helper-service";
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";

/*
  Generated class for the ReviewServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReviewServiceProvider {

  constructor(public http: HttpClient,
              public helper: HelperServiceProvider) {
  }

  getAllItems(): Observable<object[]> {
    return this.http.get(`${this.helper.baseUrl}/reviews`).pipe(
      map(this.helper.extractData),
      catchError(this.helper.handleError)
    )
  }

}
