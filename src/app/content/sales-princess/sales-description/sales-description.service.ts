import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsAllSoldItemsDTO} from './sales-description-DTOs/ShopsAllSoldItemsDTO';
import {DateRangeDTO} from './sales-description-DTOs/DateRangeDTO';
import {ShopDTO} from "../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto";

@Injectable({
  providedIn: 'root'
})
export class SalesDescriptionService {

  constructor(private http: HttpClient) {
  }

  getSoldItemsList(startDateValue: string, endDateValue: string): Observable<ShopsAllSoldItemsDTO[]> {

    const range: DateRangeDTO = {
      startDate: startDateValue,
      endDate: endDateValue
    };

    return this.http.post<ShopsAllSoldItemsDTO[]>(environment.getSoldItemsList, range);
  }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }
}
