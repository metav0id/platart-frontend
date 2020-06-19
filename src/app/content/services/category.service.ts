import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllActivatedCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllActivatedCategories);
  }
}
