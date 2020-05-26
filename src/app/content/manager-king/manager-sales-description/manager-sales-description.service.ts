import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsAllSoldItemsDTO} from './managers-sales-description-DTOs/ShopsAllSoldItemsDTO';
import {DateRangeDTO} from './managers-sales-description-DTOs/DateRangeDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerSalesDescriptionService {

  constructor(private http: HttpClient) { }

  getSoldItemsList(startDateValue: string, endDateValue: string): Observable<ShopsAllSoldItemsDTO[]> {

    const range: DateRangeDTO = {
      startDate: startDateValue,
      endDate: endDateValue
    };

    return this.http.post<ShopsAllSoldItemsDTO[]>(environment.getSoldItemsList, range);
  }
}
