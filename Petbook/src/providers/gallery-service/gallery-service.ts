import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HelperServiceProvider} from "../helper-service/helper-service";

/*
  Generated class for the GalleryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GalleryServiceProvider {

  constructor(public http: HttpClient,
              public helper: HelperServiceProvider)
  {
    console.log('Hello GalleryServiceProvider Provider');
  }


  getAllItems(): Observable<object[]> {
    return this.http.get(`${this.helper.baseUrl}/gallery`).pipe(
      map(this.helper.extractData),
      catchError(this.helper.handleError)
    );
  }
}
