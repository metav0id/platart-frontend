import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../warehouseCategory/warehouse-item-category-DTO';

@Injectable({
  providedIn: 'root'
})
export class NewitemcategoryService {

  private readonly URL_GET_ALL_CATEGORIES = 'http://localhost:8081/warehouse/getAllCategories';
  private readonly URL_SAVE_NEW_CATEGORY = 'http://localhost:8081/warehouse/saveNewCategory';
  private readonly URL_DELETE_CATEGORY = 'http://localhost:8081/warehouse/deleteCategory';

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(this.URL_GET_ALL_CATEGORIES, null);
  }

  saveNewCategory(newItemCategory: string): void {
    let warehouseItemCategoryDTO: WarehouseItemCategoryDTO = {category: newItemCategory};
    this.http.post<null>(this.URL_SAVE_NEW_CATEGORY, warehouseItemCategoryDTO).subscribe();
  }

  deleteCategory(deleteCategory: string): void {
    let warehouseDeleteCategoryItemDTO: WarehouseItemCategoryDTO = {category: deleteCategory};
    this.http.post<null>(this.URL_DELETE_CATEGORY, warehouseDeleteCategoryItemDTO).subscribe();
  }

}
