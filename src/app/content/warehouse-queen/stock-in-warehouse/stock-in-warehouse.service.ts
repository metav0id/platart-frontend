import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockInWarehouseService {

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<WarehouseGetAllItemsDTO[]> {
    return this.http.post<WarehouseGetAllItemsDTO[]>('http://localhost:8081/warehouse/getallitems', null);
  }

}
