import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Comerce} from './comerce';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComerceService {
// the string connects with the service from backend that will gett all offers aviable

  /** this adds the header needed in case the method calls for one**/
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  /**contructor must have an HTTPclient**/
  constructor(private httpClient: HttpClient) {
  }

// this method is called readAllOffers and gets an observable type back that becomes an array of offers.


  // public readAllComerces(): Observable<Offer[]> {
  //   //this returns the list provided from the backend link.
  //   return this.httpClient.get<Offer[]>(this.urlEndPoint);
  // }

  create(comerce: Comerce): Observable<Comerce> {
// this method uses post to create an offer . parameters are an url for the method, the DTO and a header if necessary
    return this.httpClient.post<Comerce>(environment.saveCommerce, comerce, {headers: this.httpHeader});
  }


}
