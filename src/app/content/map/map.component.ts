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
import {
  FormControl,
  Validators
} from "@angular/forms";
import {MarkerFormComponent} from "./components/marker-form.component";
import {Router, ActivatedRoute} from "@angular/router";
import {Comerce} from "../comerce/comerce";
import {TRANSLOCO_SCOPE} from "@ngneat/transloco";
export interface DialogData {
  markerToEdit: Marcador;
  markerToGetCoords: Marcador;
}
import {TooltipPosition} from '@angular/material/tooltip';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'map', alias: 'translate' }}]
})
export class MapComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  lat: number = -0.180653;
  lng: number = -78.467834;
  marcadores: Marcador[] = new Array();
  marker: Marcador;
  markerToEdit: Marcador;
  markerToGetCoords: Marcador;
  markersToEdit: Marcador[] = new Array();
  //use this variable when the connetion with BE is completed
  allMarkers: Marcador[];
  public markerControl = new FormControl('', Validators.required);

//When the component is started it gives a list with all markers back.
  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.marcadores = response);


  }

  constructor( private mapService: MapService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  //This method is the guide to follow when wanting to open a dialog window
  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


//This method finds a client when an id is provided
  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.mapService.getMarker(id).subscribe( (marcador) => this.marker = marcador)
      }
    })
  }




//This methods adds a new marker to the map, opens a dialog window to asign it to a comerce and saves the connection in data base.
  agregarMarcador(evento): Marcador{
    //Creates marker with coords
    const coords: { lat: string, lng: string } = evento.coords;
    // const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    const nuevoMarcador = {lat: coords.lat, lng: coords.lng, name: '', address:"", link:'',category:'',id: null}
    this.marcadores.push(nuevoMarcador);
    console.log(nuevoMarcador.lat,nuevoMarcador.lng);

    // opens dialog window
    const dialogRef = this.dialog.open(MarkerFormComponent, {
      width: '600px',
      data: {selectedComerce: this.markerToEdit, coordMarker: nuevoMarcador}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.markerToEdit = result;

      this.markersToEdit.push(this.markerToEdit)
      this.markersToEdit.push(nuevoMarcador)
      console.log(this.markersToEdit.length)

      //send array to backend
      this.mapService.update(this.markersToEdit)
    });


    // this.mapService.create(nuevoMarcador).subscribe(response => this.marker = response);

    return this.marker = nuevoMarcador;

  }


//This methods deletes the marker from the map and the data base.
  borrarComercio(i: number, marker: Marcador){
    console.log(i);
    this.mapService.delete(marker);
    this.marcadores.splice(i,1);
  }
  borrarMarcador(i: number, marker: Marcador){
    console.log(i);
    this.mapService.deleteMarker(marker);
    this.marcadores.splice(i,1);
  }
}
