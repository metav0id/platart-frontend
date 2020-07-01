import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopInventoryItem} from './view-shop-inventory-DTOs/ShopInventoryItem';
import { Observable} from 'rxjs';
import {ShopsStockItemDTO} from './view-shop-inventory-DTOs/ShopsStockItemDTO';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewShopInventoryService {

  constructor(private http: HttpClient) {
  }

  getAllItemsObs(shopInput: string): Observable<ShopInventoryItem[]> {

    const requestedShop: ShopsStockItemDTO = {
      shop: shopInput
    };
    return this.http.post<ShopInventoryItem[]>(environment.getShopInventoryItems, requestedShop);
  }
}
