import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page-warehouse',
  templateUrl: './landing-page-warehouse.component.html',
  styleUrls: ['./landing-page-warehouse.component.css']
})
export class LandingPageWarehouseComponent implements OnInit {
  role: String = "Warehouse manager";
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
  }

}
