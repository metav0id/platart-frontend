import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../warehouseCategory/warehouse-item-category-DTO';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewitemcategoryService {

  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllCategories);
  }

  getAllActivatedCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllCategories);
  }

  getAllDeactivatedCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllCategories);
  }

  saveNewCategory(newItemCategory: string): Observable<boolean> {
    const warehouseItemCategoryDTO: WarehouseItemCategoryDTO = {category: newItemCategory, isActivated: true};
    return this.http.post<boolean>(environment.saveNewCategory, warehouseItemCategoryDTO);
  }

  deactivateCategory(deactivateCategory: string): void {
    const warehouseDeleteCategoryItemDTO: WarehouseItemCategoryDTO = {category: deactivateCategory, isActivated: false};
    this.http.post(environment.deleteCategory, warehouseDeleteCategoryItemDTO).subscribe();
  }

  activateCategory(deactivateCategory: string): void {
    const warehouseDeleteCategoryItemDTO: WarehouseItemCategoryDTO = {category: deactivateCategory, isActivated: true};
    this.http.post(environment.deleteCategory, warehouseDeleteCategoryItemDTO).subscribe();
  }
}
