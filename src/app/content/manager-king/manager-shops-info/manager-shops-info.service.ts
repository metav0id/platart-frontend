import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ShopDTO} from '../../sales-princess/new-delivery-from-warehouse/shop-dto';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ShopInventoryItem} from '../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';
import {ShopsStockItemDTO} from '../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopsStockItemDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerShopsInfoService {

  constructor(private http: HttpClient) { }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }

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
    //return this.http.post<ShopInventoryItem[]>('http://localhost:8081/shops/getShopInventoryItems', requestedShop);

    const newObs = new Observable<ShopInventoryItem[]>((observable) => {
      observable.next(ELEMENT_DATA);
    });
    return newObs;
  }
}
