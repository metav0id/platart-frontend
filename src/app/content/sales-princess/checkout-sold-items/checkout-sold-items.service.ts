import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShopsCurrentInventoryDTO} from "../sales-princess-DTOs/ShopsCurrentInventoryDTO";
import {WarehouseItemCategoryDTO} from "../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  private readonly URL_GET_ALL_ITEMS_ALL_SHOPS: string = 'http://localhost:8081/shops/getAllItemsAllShops';
  private readonly URL_GET_ALL_CATEGORIES = 'http://localhost:8081/warehouse/getAllCategories';


  constructor(private http: HttpClient) { }

  public getAllItemsAllShops(): void{
    this.http.post<ShopsCurrentInventoryDTO[]>(this.URL_GET_ALL_ITEMS_ALL_SHOPS, null).subscribe(JsonDto =>{
      console.log(JsonDto);
    })
  }

  public getAllCategories(): Observable<WarehouseItemCategoryDTO[]>{
    return this.http.post<WarehouseItemCategoryDTO[]>(this.URL_GET_ALL_CATEGORIES, null);
  }

}
