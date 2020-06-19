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


  /** this adds the header needed in case the method calls for one**/
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  /**contructor must have an HTTPclient**/
  constructor(private httpClient: HttpClient) {
  }


  create(comerce: Comerce): Observable<Comerce> {
/** this method uses post to create an offer . parameters are an url for the method, the DTO and a header if necessary*/
    return this.httpClient.post<Comerce>(environment.saveCommerce, comerce, {headers: this.httpHeader});
  }

  edit(marcador: Marcador[] = []): void {
    this.httpClient.post<null>(environment.editMarker, marcador).subscribe();

  }

  getComerce(comerce: Comerce): Observable<Marcador> {
    return this.httpClient.post<Marcador>(environment.findCommerce, comerce, {headers: this.httpHeader});
  }

readShops(): Observable<Marcador[]> {
    return this.httpClient.get<Marcador[]>(environment.getAllShops);
  }
}
