import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {Marcador} from './components/marker.class';
import {Comerce} from '../comerce/comerce';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

// the string connects with the service from backend that will gett all offers aviable

  // this adds the header needed in case the method calls for one
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  // contructor must have an HTTPclient
  constructor(private httpClient: HttpClient) {
  }


// this method is called readAllMarkers and gets an observable type back that becomes an array of offers.

  public readAllMarkers(): Observable<Marcador[]> {
    // this returns the list provided from the backend link.
    return this.httpClient.get<Marcador[]>(environment.getAllMarkers);
  }

  create(marcador: Marcador): Observable<Marcador> {

    return this.httpClient.post<Marcador>(environment.saveMarker, marcador, {headers: this.httpHeader});
    console.log(marcador.lng, marcador.lat);
  }

  delete(marcador: Marcador): void {

    this.httpClient.post<null>(environment.deleteMarker, marcador).subscribe();
  }


  getMarker(marker: Marcador): Observable<Marcador> {

    return this.httpClient.post<Marcador>(environment.findMarker, marker, {headers: this.httpHeader});

  }

  update(marcador: Marcador[] = new Array()): void {
    console.log(marcador);
    // return this.httpClient.post<Marcador>(`$ {this.urlEndPoint2}\${id}`,marcador,{headers: this.httpHeader})
    this.httpClient.post<null>(environment.findMarker, marcador).subscribe();
  }

  // update (marcador: Marcador[]= new Array()): Observable<Marcador>{
  //   console.log(marcador);
  //   // return this.httpClient.post<Marcador>(`$ {this.urlEndPoint2}\${id}`,marcador,{headers: this.httpHeader})
  //   return this.httpClient.post<Marcador>(this.urlEndPoint2, marcador,{headers: this.httpHeader});
  // }

  getComerce(comerce: Comerce): Observable<Comerce> {

    return this.httpClient.post<Comerce>(environment.findCommerce, comerce, {headers: this.httpHeader});
  }


//   create(offer: OffeerToSend):Observable<OffeerToSend>{
// //this method uses post to create an offer . parameters are an url for the method, the DTO and a header if necessary
//     return this.httpClient.post<OffeerToSend>(this.urlEndPoint1,offer,{headers:this.httpHeader})
//   }
//
//
//   agregarMarcador(evento):Observable<Marcador>{
//     console.log(evento.coords.lat);
//     const coords: { lat: string, lng: string } = evento.coords;
//     const nuevoMarcador = new Marcador(coords.lat, coords.lng);
//     this.marcadores.push(nuevoMarcador);
//     console.log(evento.coords.lat);
//   }
//
//
//   borrarMarcador(i: number){
//     console.log(i);
//     this.marcadores.splice(i,1);
//   }


}
