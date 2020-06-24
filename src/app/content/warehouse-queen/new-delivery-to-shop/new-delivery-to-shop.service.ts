import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NewOrderItemDTO} from './new-delivery-to-shop-DTOs/NewOrderItemDTO';
import {VerifyAmountItemsOnStockDTO} from './new-delivery-to-shop-DTOs/VerifyAmountItemsOnStockDTO';
import {WarehouseNewDeliveryPersistanceResponseDTO} from './new-delivery-to-shop-DTOs/WarehouseNewDeliveryPersistanceResponseDTO';
import {environment} from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToShopService {

  constructor(private http: HttpClient) {
  }

  getAllNewOrderItems(): Observable<NewOrderItemDTO[]> {
    return this.http.post<NewOrderItemDTO[]>(environment.getAllNewOrderItems, null);
  }

  setAllNewOrderItems(newOrderItemDTOList: NewOrderItemDTO[]): Observable<NewOrderItemDTO[]> {
    return this.http.post<NewOrderItemDTO[]>(environment.setAllNewOrderItems, newOrderItemDTOList);
  }

  verifyAmountItemsOnStock(categoryInput: string,
                           quantityInput: number,
                           pricePerQuantityInput: number): Observable<VerifyAmountItemsOnStockDTO> {
    const requestTest: VerifyAmountItemsOnStockDTO = {
      category: categoryInput,
      quantity: quantityInput,
      priceListPerUnit: pricePerQuantityInput
    };

    return this.http.post<VerifyAmountItemsOnStockDTO>(environment.verifyAmountItemsOnStock, requestTest);
  }

  sendFinalizedOrder(sendOrderItemDTOList: NewOrderItemDTO[]): Observable<WarehouseNewDeliveryPersistanceResponseDTO> {
    console.log('Order was send');
    console.log(sendOrderItemDTOList);
    return new Observable((observer) => {
      let persistanceResponseList: WarehouseNewDeliveryPersistanceResponseDTO;
      this.http.post<WarehouseNewDeliveryPersistanceResponseDTO>(environment.saveDeliveryOrder, sendOrderItemDTOList).subscribe(JsonDto => {
        persistanceResponseList = JsonDto;
        observer.next(persistanceResponseList);
      });
    });
  }

}
