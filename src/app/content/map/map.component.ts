import { Component, OnInit } from '@angular/core';
import {Marcador} from "./components/marker.class";
import {MARKERS} from "./components/marker";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  marcadores: Marcador[] = MARKERS;

  constructor() {
    // const nuevoMarcador = new Marcador(51.678418, 7.809007);
    // this.marcadores.push(nuevoMarcador);
  }

  ngOnInit(): void {
  }
  agregarMarcador(evento){
    console.log(evento.coords.lat);
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
  }
}
