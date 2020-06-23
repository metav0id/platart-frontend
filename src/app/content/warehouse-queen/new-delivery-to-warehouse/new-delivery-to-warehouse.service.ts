import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WarehouseCheckInNewItemDTO} from './warehouse-check-in-new-item-DTO';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToWarehouseService {


  constructor(private http: HttpClient) {
  }

  public saveList(listDeliveryItems: WarehouseCheckInNewItemDTO[]): Observable<boolean> {
    return this.http.post<boolean>(environment.saveListDeliverySupplier, listDeliveryItems);
  }
}
