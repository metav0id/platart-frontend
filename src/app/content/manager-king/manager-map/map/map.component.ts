import {Component, OnInit} from '@angular/core';
import {Marcador} from "../components/marker.class";

import {MapService} from "./map.service";
import {MatDialog} from "@angular/material/dialog";
import {FormComponent} from "../comerce/form.component";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {MarkerFormComponent} from "../components/marker-form.component";

import {TRANSLOCO_SCOPE, TranslocoService} from '@ngneat/transloco';
import {MatTableModule} from '@angular/material/table';
export interface DialogData {
  markerToEdit: Marcador;
  markerToGetCoords: Marcador;
}

import {TooltipPosition} from '@angular/material/tooltip';
import {Comerce} from "../comerce/comerce";
import {ComerceFormComponent} from "../comerce-form/comerce-form.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'managerKing', alias: 'translate'}}]
})
export class MapComponent implements OnInit {
  displayedColumns: string[] = ['name', 'address', 'category'];
  dataSource: Marcador[] = new Array();
  /** tooltip features**/
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  /** quito coordinates**/
  lat: number = -0.180653;
  lng: number = -78.467834;
  marcadores: Marcador[] = new Array();

  marker: Marcador;
  comerce: Comerce;
  markerToEdit: Marcador;
  markersToEdit: Marcador[] = new Array();
  latE: string;
  lngE: string;

  public markerControl = new FormControl('', Validators.required);

  /**When the component is started it gives a list with all markers back.**/
  ngOnInit(): void {
    this.mapService.readAllMarkers().subscribe(response => this.marcadores = response);
    this.mapService.readAllMarkers().subscribe(response => this.dataSource = response);
  }

  constructor(private translocoService: TranslocoService, private mapService: MapService, public dialog: MatDialog) {
  }

  /**This method is the guide to follow when wanting to open a dialog window**/
  openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  /**This method finds a client when an id is provided**/
  loadMarkerToModify(marcador: Marcador): void {
    this.latE = marcador.lat;
    this.lngE = marcador.lng
    const dialogRef = this.dialog.open(ComerceFormComponent, {
      width: '400px',
      data: {lat: this.latE, lng: this.lngE}
    });

    dialogRef.afterClosed().subscribe(result => {
    });

  }


  /**This methods adds a new marker to the map,
   * opens a dialog window to asign it to a comerce and saves the connection in data base.
   * **/
  agregarMarcador(evento): Marcador {
    //Creates marker with coords
    const coords: { lat: string, lng: string } = evento.coords;
    // const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    const nuevoMarcador = {lat: coords.lat, lng: coords.lng, name: null, address: "", link: '', category: '', id: null}
    this.marcadores.push(nuevoMarcador);
    console.log(nuevoMarcador.lat, nuevoMarcador.lng);

    // opens dialog window
    const dialogRef = this.dialog.open(MarkerFormComponent, {
      width: '600px',
      data: {selectedComerce: this.markerToEdit, coordMarker: nuevoMarcador}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.markerToEdit = result;

      this.markersToEdit.push(this.markerToEdit)
      this.markersToEdit.push(nuevoMarcador)

      //send array to backend
      this.mapService.update(this.markersToEdit)
    });
    return this.marker = nuevoMarcador;
  }


  /**This methods deletes the marker from the map and the data base.**/
  borrarComercio(i: number, marker: Marcador) {
    this.mapService.delete(marker);
    this.marcadores.splice(i, 1);
  }

  /**This methods deletes the marker from the map only.**/
  borrarMarcador(i: number, marker: Marcador) {
    this.mapService.deleteMarker(marker);
    this.marcadores.splice(i, 1);
  }
}
