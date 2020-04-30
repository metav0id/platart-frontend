import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../warehouseCategory/warehouse-item-category-DTO';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewitemcategoryService {
  //
  // private readonly URL_GET_ALL_CATEGORIES = 'http://161.35.4.253:8081/warehouse/getAllCategories';
  // private readonly URL_SAVE_NEW_CATEGORY = 'http://161.35.4.253:8081/warehouse/saveNewCategory';
  // private readonly URL_DELETE_CATEGORY = 'http://161.35.4.253:8081/warehouse/deleteCategory';

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(environment.getAllCategories, null);
  }

  saveNewCategory(newItemCategory: string): void {
    const warehouseItemCategoryDTO: WarehouseItemCategoryDTO = {category: newItemCategory};
    this.http.post<null>(environment.saveNewCategory, warehouseItemCategoryDTO).subscribe();
  }

  deleteCategory(deleteCategory: string): void {
    const warehouseDeleteCategoryItemDTO: WarehouseItemCategoryDTO = {category: deleteCategory};
    this.http.post<null>(environment.deleteCategory, warehouseDeleteCategoryItemDTO).subscribe();
  }

}
