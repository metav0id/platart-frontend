import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ShopInventoryItem} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopInventoryItem';
import {ShopsStockItemDTO} from '../../../sales-princess/view-shop-inventory/view-shop-inventory-DTOs/ShopsStockItemDTO';
import {Shop} from './manager-warehouse-info-DTOs/Shop';
import {WarehouseGetAllItemsDTO} from "../../../warehouse-queen/stock-in-warehouse/stock-in-warehouse-DTOs/WarehouseGetAllItemsDTO";

@Injectable({
  providedIn: 'root'
})
export class ManagerWarehouseInfoService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<WarehouseGetAllItemsDTO[]> {
    return this.http.post<WarehouseGetAllItemsDTO[]>(environment.getAllItemsInStock, null);
  }

}
