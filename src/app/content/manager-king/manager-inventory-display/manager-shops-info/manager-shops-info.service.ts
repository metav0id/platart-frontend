import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ShopInventoryItem} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';
import {ShopsStockItemDTO} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopsStockItemDTO';
import {Shop} from './manager-shops-info-DTOs/Shop';

@Injectable({
  providedIn: 'root'
})
export class ManagerShopsInfoService {

  constructor(private http: HttpClient) {
  }

  public getListShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(environment.getAllShops);
  }

  getSpecificItemsObs(shopInput: string): Observable<ShopInventoryItem[]> {

    const requestedShop: ShopsStockItemDTO = {
      shop: shopInput
    };
    return this.http.post<ShopInventoryItem[]>(environment.getShopInventoryItems, requestedShop);
  }

  getAllItemsObs(): Observable<ShopInventoryItem[]> {
    return this.http.post<ShopInventoryItem[]>(environment.getAllItemsAllShops, null);
  }

}
