import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WarehouseItemCategoryDTO} from "../warehouseDTOs/warehouse-item-category-DTO";

@Injectable({
  providedIn: 'root'
})
export class NewitemcategoryService {

  private readonly getAllCategoriesURL = 'http://localhost:8081/warehouse/getAllCategories';
  private readonly saveNewCategoryURL = 'http://localhost:8081/warehouse/saveNewCategory';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(this.getAllCategoriesURL, null);
  }

  saveNewCategory(newItemCategory: string): void{
    let warehouseItemCategoryDTO: WarehouseItemCategoryDTO = {category: newItemCategory};
    this.http.post<null>(this.saveNewCategoryURL, warehouseItemCategoryDTO).subscribe();
  }

}
