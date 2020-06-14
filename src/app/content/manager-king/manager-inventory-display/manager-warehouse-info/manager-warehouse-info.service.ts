import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {WarehouseGetAllItemsDTO} from './manager-warehouse-info-DTOs/WarehouseGetAllItemsDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerWarehouseInfoService {

  constructor(private http: HttpClient) {
  }

  getAllItems(): Observable<WarehouseGetAllItemsDTO[]> {
    return this.http.post<WarehouseGetAllItemsDTO[]>(environment.getAllItemsInStock, null);
  }

}
