import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewOrderItemDTO} from './NewOrderItemDTO';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToShopService {
  private readonly getAllNewOrderItemsURL = 'http://localhost:8081/warehouse/getAllNewOrderItems';
  private readonly setAllNewOrderItemsURL = 'http://localhost:8081/warehouse/setAllNewOrderItems';

  constructor(private http: HttpClient) {
  }

  getAllNewOrderItems(): Observable<NewOrderItemDTO[]> {
    return this.http.post<NewOrderItemDTO[]>(this.getAllNewOrderItemsURL, null);
  }

  setAllNewOrderItems(newOrderItemDTOList: NewOrderItemDTO[]): void {
    console.log(newOrderItemDTOList);
    this.http.post<NewOrderItemDTO[]>(this.setAllNewOrderItemsURL, newOrderItemDTOList).subscribe();
  }

}
