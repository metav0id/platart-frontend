import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-manager-inventory-display',
  templateUrl: './manager-inventory-display.component.html',
  styleUrls: ['./manager-inventory-display.component.css']
})
export class ManagerInventoryDisplayComponent implements OnInit {

  // inventory type
  inventorySelected: string;
  inventoryRange: string[] = ['Warehouse', 'Shops'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
