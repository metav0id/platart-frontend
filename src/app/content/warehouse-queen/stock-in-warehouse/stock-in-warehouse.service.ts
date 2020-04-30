import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockInWarehouseService {
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<WarehouseGetAllItemsDTO[]> {
    return this.http.post<WarehouseGetAllItemsDTO[]>(environment.getAllItemsInStock, null);
  }

}
