import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  lat1: number = 51.679418;
  lng1: number = 7.809007;
  lat2: number = 51.676418;
  lng2: number = 7.809007;
  constructor() { }

  ngOnInit(): void {
  }

}
