import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {ShopCheckInNewItemsDTO} from './shop-check-in-new-items-dto';
import {ShopDTO} from './shop-dto';
import {TableItem} from './table-item';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryFromWarehouseService {
  constructor(private http: HttpClient) {
  }

  public getNewDeliveryForShop(shop: string): Observable<TableItem[]> {

    const shopDTO = {shop};

    return this.http.post<TableItem[]>(environment.getDeliveryItemsFromWarehouseByShop, shopDTO).pipe(map(Json => {
      return this.convertDtoToTableItem(Json);
    }));
  }

  private convertDtoToTableItem(listItems): TableItem[] {
    const listItemsPeriodicElements: TableItem[] = [];

    listItems.forEach(entry => {
      const entryPeriodicElement: TableItem = {
        isChecked: false,
        identifierOnDeliveryList: entry.identifierOnDeliveryList,
        category: entry.category,
        priceListPerUnit: entry.listPrice,
        priceSalesPerUnit: entry.salesPrice,
        quantity: entry.quantity,
        originalQuantity: entry.quantity,
        timestamp: entry.timestamp,
        instructionComment: entry.comment,
        comment: ''
      };
      listItemsPeriodicElements.push(entryPeriodicElement);
    });
    return listItemsPeriodicElements;
  }

  public saveList(shop: string, listTable: TableItem[]): TableItem[] {
    const listDTO: ShopCheckInNewItemsDTO[] = this.convertTableItemToDTO(shop, listTable.filter(obj => obj.isChecked));
    this.http.post(environment.saveDeliveryItemsToShopStock, listDTO).subscribe(answer => console.log('Saved successfully? ' + answer));
    return listTable.filter(obj => !obj.isChecked);
  }

  private convertTableItemToDTO(shop: string, listTable: TableItem[]): ShopCheckInNewItemsDTO[] {
    const listDTO: ShopCheckInNewItemsDTO[] = [];
    for (const item of listTable) {
      const itemDTO: ShopCheckInNewItemsDTO = {
        identifierOnDeliveryList: item.identifierOnDeliveryList,
        shop,
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
