import { Component, OnInit } from '@angular/core';
import {NewOrderItemDTO} from "./NewOrderItemDTO";
import {HttpClient} from "@angular/common/http";
import {NewDeliveryToShopService} from "./new-delivery-to-shop.service";

@Component({
  selector: 'app-new-delivery-order',
  templateUrl: './new-delivery-to-shop.component.html',
  styleUrls: ['./new-delivery-to-shop.component.css']
})
export class NewDeliveryToShopComponent implements OnInit {

  displayedColumns: string[] = ['category', 'deliveryQuantity', 'deliveryPricePerUnit','deliveryDiscount','deliveryFinalPricePerUnit'];
  public newOrderData: NewOrderItemDTO[] = [];
  totalCost: 0;

  newOrderElement: NewOrderItemDTO = {
    id: 0,
    category: 'itemCategory',
    deliveryQuantity: 10,
    deliveryFinalPricePerUnit: 8,
    deliveryDiscount: 20,
    deliveryPricePerUnit: 10
  };

  constructor(private http: HttpClient, private newDeliveryToShopService: NewDeliveryToShopService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void{
    this.newDeliveryToShopService.getAllNewOrderItems()
      .subscribe(JsonDto => this.newOrderData = JsonDto);
  }

  setNewOrder() {
    if (
        this.newOrderElement.category !== '' &&
        this.newOrderElement.deliveryQuantity > 0 &&
        this.newOrderElement.deliveryPricePerUnit > 0 &&
        this.newOrderElement.deliveryDiscount < 100 &&
        this.newOrderElement.deliveryFinalPricePerUnit >0) {
      this.newOrderData.push(this.newOrderElement);
      console.log(this.newOrderData);
    }
  }

}
