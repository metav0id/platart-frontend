import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page-warehouse',
  templateUrl: './landing-page-warehouse.component.html',
  styleUrls: ['./landing-page-warehouse.component.css']
})
export class LandingPageWarehouseComponent implements OnInit {
  warehouse: String = "Warehouse manager";
  warehouseb:boolean;
  manager: String = "Manager";
  managerb: boolean;
  sales: String = "Sales";
  salesb: boolean;
  role: String;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
    this.readToken();
  }

  readToken() {
    this.role = localStorage.getItem('role');

    if ( this.role == "Manager") {
      this.managerb = true;
    } else if(this.role =="Shop") {
      this.salesb =true;
    }else if(this.role == "Warehouse"){
      this.warehouseb = true;
    }

  }
}
