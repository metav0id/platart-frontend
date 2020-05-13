import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ShopDTO} from '../../sales-princess/new-delivery-from-warehouse/shop-dto';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManagerShopsInfoService {

  constructor(private http: HttpClient) { }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }
}
