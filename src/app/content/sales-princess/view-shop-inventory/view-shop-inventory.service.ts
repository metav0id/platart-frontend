import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopInventoryItem} from './view-shop-inventory-DTOs/ShopInventoryItem';
import {observable, Observable} from 'rxjs';
import {ShopsStockItemDTO} from "./view-shop-inventory-DTOs/ShopsStockItemDTO";

@Injectable({
  providedIn: 'root'
})
export class ViewShopInventoryService {

  constructor(private http: HttpClient) { }

  getAllItemsObs(shopInput: string): Observable<ShopInventoryItem[]> {
    const ELEMENT_DATA: ShopInventoryItem[] = [
      {
        position: 1,
        shop: 'shop1',
        category: 'pulsera',
        quantity: 5,
        priceSalesPerUnit: 40,
        priceListPerUnit: 40
      },
    ];

    const requestedShop: ShopsStockItemDTO = {
      shop: shopInput
    };
    return this.http.post<ShopInventoryItem[]>('http://localhost:8081/shops/getShopInventoryItems', requestedShop);

    /*const newObs = new Observable<ShopInventoryItem[]>((observable) => {
      observable.next(ELEMENT_DATA);
    });
    return newObs;*/
  }
}
