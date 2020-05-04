import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from './warehouse-item-category-DTO';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseCategoryService {
  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(environment.getAllCategories, null);
  }

}
