import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CheckedInItemsDTO} from './checked-in-items-DTOs/CheckedInItemsDTO';
import {ShopDTO} from '../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto';
import {ShopSimpleDto} from './checked-in-items-DTOs/shop-simple-dto';
import {ShopDateSimpleDto} from './checked-in-items-DTOs/shop-date-simple-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckedInItemsService {

  constructor(private http: HttpClient) { }

  public getCheckedInItems(): Observable<CheckedInItemsDTO[]> {
    return this.http.post<CheckedInItemsDTO[]>(environment.getAllCheckedInItems, null);
  }

  public getCheckedInItemsListSpecificShop(selectedShop: string): Observable<CheckedInItemsDTO[]> {
    const shopSimpleDTO: ShopSimpleDto = {
      shop : selectedShop
    };
    return this.http.post<CheckedInItemsDTO[]>(environment.getSpecificCheckedInItems, shopSimpleDTO);
  }

  public getCheckedInItemsListSpecificShopDate(selectedShop: string, startDate: string, endDate: string): Observable<CheckedInItemsDTO[]> {
    /*const shopSimpleDTO: ShopSimpleDto = {
      shop : selectedShop
    };*/
    const shopDateSimpleDTO: ShopDateSimpleDto = {
      shop : selectedShop,
      startDate,
      endDate
    };
    // return this.http.post<CheckedInItemsDTO[]>(environment.getSpecificCheckedInItems, shopSimpleDTO);
    return this.http.post<CheckedInItemsDTO[]>(environment.getSpecificCheckedInItemsDate, shopDateSimpleDTO);
  }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }

}
