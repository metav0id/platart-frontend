import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsAllSoldItemsDTO} from './sales-description-DTOs/ShopsAllSoldItemsDTO';
import {ShopAndDateRangeDTO} from './sales-description-DTOs/ShopAndDateRangeDTO';

@Injectable({
  providedIn: 'root'
})
export class SalesDescriptionService {

  constructor(private http: HttpClient) {
  }

  getSoldItemsList(selectedShop: string, startDateValue: string, endDateValue: string): Observable<ShopsAllSoldItemsDTO[]> {

    const range: ShopAndDateRangeDTO = {
      shop: selectedShop,
      startDate: startDateValue,
      endDate: endDateValue
    };

    return this.http.post<ShopsAllSoldItemsDTO[]>(environment.getSoldItemsList, range);
  }
}
