import { Component, OnInit } from '@angular/core';
import {WarehouseGetAllItemsDTO} from '../stock-in-warehouse/WarehouseGetAllItemsDTO';
@Component({
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-order.component.html',
  styleUrls: ['./new-delivery-order.component.css']
})
export class NewDeliveryOrderComponent implements OnInit {

  displayedColumns: string[] = ['category', 'pricePerUnit', 'quantity', 'price'];
  public newOrderData: WarehouseGetAllItemsDTO[] = [];
  totalCost: 0;

  newOrderElement: WarehouseGetAllItemsDTO = {
    category: '',
    pricePerUnit: 0,
    quantity: 0
  };

  constructor() {
    this.newOrderData.push(
      {
          category: 'zapato',
          quantity: 15,
          pricePerUnit: 25
      }
    );
    this.newOrderData.push(
      {
        category: 'cadena',
        quantity: 10,
        pricePerUnit: 17
      }
    );
    this.newOrderData.push(
      {
        category: 'cadena2',
        quantity: 11,
        pricePerUnit: 2
      }
    );
  }

  ngOnInit(): void {
  }


  setNewOrder() {
    if (this.newOrderElement.pricePerUnit > 0 &&
        this.newOrderElement.category !== '' &&
        this.newOrderElement.quantity > 0) {
      this.newOrderData.push(this.newOrderElement);
      console.log(this.newOrderData);
    }
  }

  getTotalCost(): number {
    this.totalCost = 0;
    for (const orderElem of this.newOrderData) {
      this.totalCost += orderElem.quantity * orderElem.pricePerUnit;
    }
    return this.totalCost;
  }
}
