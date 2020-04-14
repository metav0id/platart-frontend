import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WarehouseItemCategoryDTO} from "../warehouseDTOs/warehouse-item-category-DTO";

@Injectable({
  providedIn: 'root'
})
export class NewitemcategoryService {

  private readonly getAllCategoriesURL = 'http://localhost:8081/warehouse/getAllCategories';

  constructor(private http: HttpClient) { }

  private getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(this.getAllCategoriesURL, null);
  }

}
