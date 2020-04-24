import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

import {Observable} from "rxjs";
import {Marcador} from "./components/marker.class";

@Injectable({
  providedIn: 'root'
})
export class MapService {

//the string connects with the service from backend that will gett all offers aviable
  private urlEndPoint: string ="http://localhost:8081/marker/getallmarkers";
  private urlEndPoint1: string ="http://localhost:8081/marker/savemarker";
  private urlEndPoint2: string ="http://localhost:8081/marker/update/{id}";


  //this adds the header needed in case the method calls for one
  private httpHeader= new HttpHeaders({'Content-Type': 'application/json'});
  // contructor must have an HTTPclient
  constructor(private httpClient: HttpClient) { }


//this method is called readAllMarkers and gets an observable type back that becomes an array of offers.

  public readAllMarkers(): Observable<Marcador[]> {
    //this returns the list provided from the backend link.
    return this.httpClient.get<Marcador[]>(this.urlEndPoint);
  }

  create(marcador: Marcador) : Observable<Marcador> {

    return this.httpClient.post<Marcador>(this.urlEndPoint1, marcador, {headers: this.httpHeader})
  }

  getMarker(id): Observable<Marcador>{

    return this.httpClient.get<Marcador>(`${this.urlEndPoint}/${id}`);
  }

  update (marcador: Marcador): Observable<Marcador>{
    return this.httpClient.post<Marcador>(`$ {this.urlEndPoint2}\${id}`,marcador,{headers: this.httpHeader})
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
