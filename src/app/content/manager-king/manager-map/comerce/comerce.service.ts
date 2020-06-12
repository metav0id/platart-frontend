import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  Subject
} from 'rxjs';
import {Comerce} from './comerce';
import {environment} from '../../../../../environments/environment';
import {Marcador} from "../components/marker.class";

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


  create(comerce: Comerce): Observable<Comerce> {
// this method uses post to create an offer . parameters are an url for the method, the DTO and a header if necessary
    return this.httpClient.post<Comerce>(environment.saveCommerce, comerce, {headers: this.httpHeader});
  }

  edit(marcador: Marcador[] = []): void {
    console.log(marcador);
    // return this.httpClient.post<Marcador>(`$ {this.urlEndPoint2}\${id}`,marcador,{headers: this.httpHeader})
    this.httpClient.post<null>(environment.editMarker, marcador).subscribe();

  }

  getComerce(comerce: Comerce): Observable<Marcador> {
    return this.httpClient.post<Marcador>(environment.findCommerce, comerce, {headers: this.httpHeader});
  }
}
