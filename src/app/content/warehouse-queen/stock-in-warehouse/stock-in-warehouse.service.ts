import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockInWarehouseService {
  private readonly getAllWarehouseItemsURL = 'http://161.35.4.253:8081/warehouse/getallitems';
  constructor(private http: HttpClient) { }

  getAllItems(): Observable<WarehouseGetAllItemsDTO[]> {
    return this.http.post<WarehouseGetAllItemsDTO[]>(this.getAllWarehouseItemsURL, null);
  }

}
