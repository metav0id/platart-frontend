import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from "rxjs";
import {Marcador} from "./components/marker.class";
import {Comerce} from "../comerce/comerce";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapService {

//the string connects with the service from backend that will gett all offers aviable
  /*private urlEndPoint: string ="http://localhost:8081/marker/getallmarkers";
  private urlEndPoint1: string ="http://localhost:8081/marker/savemarker";
  private urlEndPoint3: string ="http://localhost:8081/comerce/find";
  private urlEndPoint4: string ="http://localhost:8081/marker/find";
  private urlEndPoint2: string ="http://localhost:8081/marker/update";
  private urlEndPoint5: string ="http://localhost:8081/marker/delete";*/

  //this adds the header needed in case the method calls for one
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json'});

  // contructor must have an HTTPclient
  constructor(private httpClient: HttpClient) {
  }


  // this method is called readAllMarkers and gets an observable type back that becomes an array of offers.
  public readAllMarkers(): Observable<Marcador[]> {
    // this returns the list provided from the backend link.
    return this.httpClient.get<Marcador[]>(environment.getAllMarkers);
  }

// This methods allows you to create a new marker and save it in the data base. It gives it back and prints its coords.
  create(marcador: Marcador): Observable<Marcador> {
    return this.httpClient.post<Marcador>(environment.saveMarker, marcador, {headers: this.httpHeader});
    console.log("Marker created with coords: ", marcador.lng, marcador.lat);
  }

  // This method allows you to delete a selected Marker from the Map and the data base.
  delete(marcador: Marcador): void {
    this.httpClient.post<null>(environment.deleteMarker, marcador).subscribe();
    console.log('Marker Deleted');
  }

  deleteMarker(marcador: Marcador): void {
    this.httpClient.post<null>(environment.deleteCoords, marcador).subscribe();
    console.log('Marker Deleted');
  }

//This method finds a marker from the data base and gives it back through an observable that becomes a Marker.
  getMarker(marker: Marcador): Observable<Marcador> {
    return this.httpClient.post<Marcador>(environment.findMarker, marker, {headers: this.httpHeader});

  }

  //This method updates a marker saved in the data base with the information of another created in the map.
  update(marcador: Marcador[] = []): void {
    console.log(marcador);
    // return this.httpClient.post<Marcador>(`$ {this.urlEndPoint2}\${id}`,marcador,{headers: this.httpHeader})
    this.httpClient.post<null>(environment.updateMarker, marcador).subscribe();

  }

  getComerce(comerce: Comerce): Observable<Comerce> {

    return this.httpClient.post<Comerce>(environment.findCommerce, comerce, {headers: this.httpHeader});
  }


}
