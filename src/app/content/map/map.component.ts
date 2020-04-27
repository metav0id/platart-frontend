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
export interface DialogData {
  markerToEdit: Marcador;
  markerToGetCoords: Marcador;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  marcadores: Marcador[];
  marker: Marcador;
  markerToEdit: Marcador;
  markerToGetCoords: Marcador;
  markersToEdit: Marcador[] = new Array();


  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.marcadores = response);
  }

  constructor(private mapService: MapService, public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router) {
    // const nuevoMarcador = new Marcador(51.678418, 7.809007);
    // this.marcadores.push(nuevoMarcador);
  }

  public markerControl = new FormControl('', Validators.required)

  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  openDialog2(): void {
    const dialogRef = this.dialog.open(MarkerFormComponent, {
      width: '600px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.mapService.getMarker(id).subscribe( (marcador) => this.marker = marcador)
      }
    })


  }

  //use this variable when the connetion with BE is completed
    allMarkers: Marcador[];



  agregarMarcador(evento): Marcador{
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
    //opens dialog window


    // this.mapService.create(nuevoMarcador).subscribe(response => this.marker = response);

    return this.marker = nuevoMarcador;

  }

  // public edit():void {
  //   this.cargarCliente()
  //   console.log(this.marker.name);
  //   // const updatedMarcador = new Marcador(this.marker.lat,this.marker.lng);
  //   // this.mapService.update(this.marker).subscribe(response=> this.updatemarker = response);
  //   // return
  //
  // }




  //
  // readAllMarkers(): void{
  //
  //   this.mapService.readAllMarkers().subscribe(response => this.allMarkers = response);
  // }


  borrarMarcador(i: number, marker: Marcador){
    console.log(i);
    this.mapService.delete(marker);
    this.marcadores.splice(i,1);
  }
}
