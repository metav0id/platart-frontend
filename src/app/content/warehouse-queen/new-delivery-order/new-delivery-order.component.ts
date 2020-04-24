import {Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseGetAllItemsDTO} from '../stock-in-warehouse/WarehouseGetAllItemsDTO';
import {MatTable} from "@angular/material/table";
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
@Component({
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-order.component.html',
  styleUrls: ['./new-delivery-order.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'warehouseQueen/newDeliveryOrder', alias: 'translate' }}]
})
export class NewDeliveryOrderComponent implements OnInit {

  displayedColumns: string[] = ['category', 'pricePerUnit', 'quantity', 'price'];
  public newOrderData: WarehouseGetAllItemsDTO[] = [];
  totalCost: 0;

  newOrderElement: WarehouseGetAllItemsDTO = {
    category: '',
    priceListPerUnit: 0,
    quantity: 0
  };

  @ViewChild('#myCheckoutProductsTable') table: MatTable<any>;

  constructor() {
  }

  ngOnInit(): void {
  }


  setNewOrder() {
    if (this.newOrderElement.priceListPerUnit > 0 &&
        this.newOrderElement.category !== '' &&
        this.newOrderElement.quantity > 0) {
      this.newOrderData.push(this.newOrderElement);
      console.log(this.newOrderData);
    }
  }

  getTotalCost(): number {
    this.totalCost = 0;
    for (const orderElem of this.newOrderData) {
      this.totalCost += orderElem.quantity * orderElem.priceListPerUnit;
    }
    return this.totalCost;
  }
}
