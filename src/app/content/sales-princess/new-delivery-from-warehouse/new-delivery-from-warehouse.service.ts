import {Injectable, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {DeliveryItemFromWarehouseDTO} from '../sales-princess-DTOs/delivery-item-from-warehouse-dto';
import {PeriodicElement} from './periodic-element';

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

  constructor() {
  }

  public getNewDeliveryForShop(): Observable<PeriodicElement[]> {
    return new Observable<PeriodicElement[]>(observer => {
      // TODO implement selection of shop maybe by name or ID. Will see when created database
      // TODO implement httpRequest
      this.listItems.push(this.newItemOnList1);
      this.listItems.push(this.newItemOnList2);
      this.listItems.push(this.newItemOnList3);
      const listItemsPeriodicElements = this.convertDtoToPeriodicElement(this.listItems);
      console.log(listItemsPeriodicElements);
      observer.next(listItemsPeriodicElements);
    });
  }

  private convertDtoToPeriodicElement(listItems: DeliveryItemFromWarehouseDTO[]): PeriodicElement[] {
    const listItemsPeriodicElements: PeriodicElement[] = [];
    let counter = 0;
    listItems.forEach(entry => {
      const entryPeriodicElement: PeriodicElement = {
        position: counter++,
        category: entry.category,
        listPrice: entry.listPrice,
        salesPrice: entry.salesPrice,
        quantity: entry.quantity,
        timestamp: entry.timestamp,
        comment: entry.comment
      };
      listItemsPeriodicElements.push(entryPeriodicElement);
    });
    return listItemsPeriodicElements;
  }
}
