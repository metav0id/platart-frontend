import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DeliveryItemFromWarehouseDTO} from './delivery-item-from-warehouse-dto';
import {PeriodicElement} from './periodic-element';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {ShopCheckInNewItemsDTO} from './shop-check-in-new-items-dto';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryFromWarehouseService {
  private listItems: DeliveryItemFromWarehouseDTO[] = [];

  constructor(private http: HttpClient) {
  }

  public getNewDeliveryForShop(shop: string): Observable<PeriodicElement[]> {

    const shopDTO = {shop};

    return this.http.post<PeriodicElement[]>(environment.getDeliveryItemsFromWarehouseByShop, shopDTO).pipe(map(Json => {
      return this.convertDtoToPeriodicElement(Json);
    }));
  }

  private convertDtoToPeriodicElement(listItems): PeriodicElement[] {
    const listItemsPeriodicElements: PeriodicElement[] = [];

    listItems.forEach(entry => {
      const entryPeriodicElement: PeriodicElement = {
        identifierOnDeliveryList: entry.identifierOnDeliveryList,
        category: entry.category,
        priceListPerUnit: entry.listPrice,
        priceSalesPerUnit: entry.salesPrice,
        quantity: entry.quantity,
        originalQuantity: entry.quantity,
        timestamp: entry.timestamp,
        comment: entry.comment
      };
      listItemsPeriodicElements.push(entryPeriodicElement);
    });
    return listItemsPeriodicElements;
  }

  public saveList(shop: string, listTable: PeriodicElement[]) {
    console.log(this.convertPeridicElementToDTO(shop, listTable));
    //TODO http request
  }

  private convertPeridicElementToDTO(shop: string, listTable: PeriodicElement[]): ShopCheckInNewItemsDTO[] {
    const listDTO: ShopCheckInNewItemsDTO[] = [];
    for (const item of listTable) {
      const itemDTO: ShopCheckInNewItemsDTO = {
        identifierOnDeliveryList: item.identifierOnDeliveryList,
        shop: shop,
        category: item.category,
        priceListPerUnit: item.priceListPerUnit,
        priceSalesPerUnit: item.priceSalesPerUnit,
        quantity: item.quantity,
        originalQuantity: item.originalQuantity,
        timestamp: item.timestamp,
        comment: item.comment
      };
      listDTO.push(itemDTO);
    }
    return listDTO;
  }
}
