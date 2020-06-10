import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TempCheckedInItemsDTO} from './checked-in-items-DTOs/Temp-Checked-In-Items-DTO';
import {ShopDTO} from '../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto';
import {ShopSimpleDto} from './checked-in-items-DTOs/shop-simple-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckedInItemsService {

  constructor(private http: HttpClient) { }

  public getCheckedInItems(): Observable<TempCheckedInItemsDTO[]> {
    return this.http.post<TempCheckedInItemsDTO[]>(environment.getAllCheckedInItems, null);
  }

  public getCheckedInItemsListSpecificShop(selectedShop: string): Observable<TempCheckedInItemsDTO[]> {
    const shopSimpleDTO: ShopSimpleDto = {
      shop : selectedShop
    };
    return this.http.post<TempCheckedInItemsDTO[]>(environment.getSpecificCheckedInItems, shopSimpleDTO);
  }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }

}
