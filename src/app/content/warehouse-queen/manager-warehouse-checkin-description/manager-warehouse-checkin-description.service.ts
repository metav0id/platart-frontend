import {Injectable} from '@angular/core';
import {observable, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DateRangeDTO} from './manager-warehouse-checkin-description-DTOs/DateRangeDTO';
import {ShopsAllSoldItemsDTO} from './manager-warehouse-checkin-description-DTOs/ShopsAllSoldItemsDTO';
import {WarehouseCheckInNewItemDTO} from '../new-delivery-to-warehouse/warehouse-check-in-new-item-DTO';
import {ManagerWarehouseCheckinListingDTO} from './manager-warehouse-checkin-description-DTOs/ManagerWarehouseCheckinListingDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagerWarehouseCheckinDescriptionService {

  constructor(private http: HttpClient) {
  }

  getSoldItemsList(startDateValue: string, endDateValue: string): Observable<WarehouseCheckInNewItemDTO[]> {

    const range: DateRangeDTO = {
      startDate: startDateValue,
      endDate: endDateValue
    };

    return this.http.post<ManagerWarehouseCheckinListingDTO[]>(environment.getCheckinItemsList, range);
  }
}
