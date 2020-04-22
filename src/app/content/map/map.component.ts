import { Component, OnInit } from '@angular/core';
import {Marcador} from "./components/marker.class";
import {MARKERS} from "./components/marker";
import {
  HttpClient,
  HttpHeaders
} from "@angular/common/http";
import {Marker} from "@agm/core";
import {Observable} from "rxjs";
import {MapService} from "./map.service";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "../comerce/form.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  marcadores: Marcador[] = MARKERS;


  constructor(private mapService: MapService, public dialog: MatDialog) {
    // const nuevoMarcador = new Marcador(51.678418, 7.809007);
    // this.marcadores.push(nuevoMarcador);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  //use this variable when the connetion with BE is completed
    allMarkers: Marcador[];



  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.allMarkers = response);
  }

  agregarMarcador(evento){
    console.log(evento.coords.lat);
    const coords: { lat: string, lng: string } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    console.log(evento.coords.lat);
  }

  borrarMarcador(i: number){
    console.log(i);
    this.marcadores.splice(i,1);
  }
}
