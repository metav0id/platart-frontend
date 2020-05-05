import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DeliveryItemFromWarehouseDTO} from './delivery-item-from-warehouse-dto';
import {PeriodicElement} from './periodic-element';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryFromWarehouseService {

  // TEST-DATA
  private newItemOnList1 = {
    position: 1,
    category: 'Kette',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };
  private newItemOnList2 = {
    position: 1,
    category: 'Ring',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };
  private newItemOnList3 = {
    position: 1,
    category: 'Kette',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };

  private listItems: DeliveryItemFromWarehouseDTO[] = [];

  constructor(private http: HttpClient) {
  }

  public getNewDeliveryForShop(shop: string): Observable<PeriodicElement[]> {

    const shopDTO = {shop: shop};

    return this.http.post<PeriodicElement[]>(environment.getDeliveryItemsFromWarehouseByShop, shopDTO).
      pipe(map(Json => {
        return this.convertDtoToPeriodicElement(Json);
    }));
  }

  private convertDtoToPeriodicElement(listItems): PeriodicElement[] {
    const listItemsPeriodicElements: PeriodicElement[] = [];
    let counter = 0;
    listItems.forEach(entry => {
      const entryPeriodicElement: PeriodicElement = {
        position: counter++,
        category: entry.category,
        listPrice: entry.listPrice,
        salesPrice: entry.salesPrice,
        quantity: entry.quantity,
        originalQuantity: entry.quantity,
        timestamp: entry.timestamp,
        comment: entry.comment
      };
      listItemsPeriodicElements.push(entryPeriodicElement);
    });
    return listItemsPeriodicElements;
  }
}
