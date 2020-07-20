import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
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
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllActivatedCategories);
  }

  getAllDeactivatedCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllDeactivatedCategories);
  }

  saveNewCategory(newItemCategory: string): Observable<boolean> {
    const warehouseItemCategoryDTO: WarehouseItemCategoryDTO = {category: newItemCategory, activated: true};
    console.log("Post Service pre REST");
    return this.http.post<boolean>(environment.saveNewCategory, warehouseItemCategoryDTO);
  }

  deactivateCategory(category: WarehouseItemCategoryDTO): Observable<any> {
    return this.http.post<any>(environment.deactivateCategory, category);
  }

  activateCategory(category: WarehouseItemCategoryDTO): Observable<any> {
    return this.http.post<any>(environment.activateCategory, category);
  }
}
