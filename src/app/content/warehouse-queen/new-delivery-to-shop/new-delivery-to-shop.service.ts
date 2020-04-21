import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {NewOrderItemDTO} from './NewOrderItemDTO';
import {VerifyAmountItemsOnStockDTO} from "./VerifyAmountItemsOnStockDTO";
import {WarehouseNewDeliveryPersistanceResponseDTO} from "./WarehouseNewDeliveryPersistanceResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToShopService {
  private readonly getAllNewOrderItemsURL = 'http://localhost:8081/warehouse/getAllNewOrderItems';
  private readonly setAllNewOrderItemsURL = 'http://localhost:8081/warehouse/setAllNewOrderItems';
  private readonly verifyAmountItemsOnStockURL = 'http://localhost:8081/warehouse/verifyAmountItemsOnStock';
  private readonly  sendDeliveryOrderURL = 'http://localhost:8081/warehouse/sendDeliveryOrder';

  constructor(private http: HttpClient) {
  }

  getAllNewOrderItems(): Observable<NewOrderItemDTO[]> {
    return this.http.post<NewOrderItemDTO[]>(this.getAllNewOrderItemsURL, null);
  }

  setAllNewOrderItems(newOrderItemDTOList: NewOrderItemDTO[]): void {
    console.log('Persist the order to database.');
    this.http.post<NewOrderItemDTO[]>(this.setAllNewOrderItemsURL, newOrderItemDTOList).subscribe();
  }

  verifyAmountItemsOnStock(categoryInput: string, quantityInput: number, pricePerQuantityInput: number): Observable<VerifyAmountItemsOnStockDTO> {
    console.log('verifyAmountItemsOnStock');
    let requestTest: VerifyAmountItemsOnStockDTO = {
      category: categoryInput,
      quantity: quantityInput,
      pricePerUnit: pricePerQuantityInput
    };

    return this.http.post<VerifyAmountItemsOnStockDTO>(this.verifyAmountItemsOnStockURL, requestTest);
  }

  sendFinalizedOrder(sendOrderItemDTOList: NewOrderItemDTO[]): Observable<WarehouseNewDeliveryPersistanceResponseDTO> {
    console.log('Order was send');
    console.log(sendOrderItemDTOList);
    return new Observable( (observer) =>{
      let persistanceResponseList: WarehouseNewDeliveryPersistanceResponseDTO;
      this.http.post<WarehouseNewDeliveryPersistanceResponseDTO>(this.sendDeliveryOrderURL, sendOrderItemDTOList).subscribe(JsonDto => {
        persistanceResponseList = JsonDto;
        observer.next(persistanceResponseList);
      });
    } );
  }

}
