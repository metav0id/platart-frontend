import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {CheckedInItemsDTO} from './checked-in-items-DTOs/CheckedInItemsDTO';
import {ShopDateSimpleDto} from './checked-in-items-DTOs/shopDateSimpleDTO';

@Injectable({
  providedIn: 'root'
})
export class CheckedInItemsService {

  constructor(private http: HttpClient) { }

  public getCheckedInItemsListSpecificShopDate(selectedShop: string, startDate: string, endDate: string): Observable<CheckedInItemsDTO[]> {
    const shopDateSimpleDTO: ShopDateSimpleDto = {
      shop : selectedShop,
      startDate,
      endDate
    };
    return this.http.post<CheckedInItemsDTO[]>(environment.getSpecificCheckedInItemsDate, shopDateSimpleDTO);
  }
}
