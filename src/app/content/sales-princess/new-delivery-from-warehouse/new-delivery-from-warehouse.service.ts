import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DeliveryItemFromWarehouseDTO} from './DeliveryItemFromWarehouseDTO';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import {ShopCheckInNewItemsDTO} from './shop-check-in-new-items-dto';
import {ShopDTO} from './shop-dto';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryFromWarehouseService {
  constructor(private http: HttpClient) {
  }

  public getNewDeliveryForShop(shop: string): Observable<DeliveryItemFromWarehouseDTO[]> {

    const shopDTO = {shop};

    return this.http.post<DeliveryItemFromWarehouseDTO[]>(environment.getDeliveryItemsFromWarehouseByShop, shopDTO).pipe(map(Json => {
      return this.convertDtoToPeriodicElement(Json);
    }));
  }

  private convertDtoToPeriodicElement(listItems): DeliveryItemFromWarehouseDTO[] {
    const listItemsPeriodicElements: DeliveryItemFromWarehouseDTO[] = [];

    listItems.forEach(entry => {
      const entryPeriodicElement: DeliveryItemFromWarehouseDTO = {
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

  public saveList(shop: string, listTable: DeliveryItemFromWarehouseDTO[]) {
    const listDTO: ShopCheckInNewItemsDTO[] = this.convertPeridicElementToDTO(shop, listTable);
    console.log(listDTO);
    this.http.post(environment.saveDeliveryItemsToShopStock, listDTO).subscribe(answer => console.log('Saved successfully? ' + answer));
  }

  private convertPeridicElementToDTO(shop: string, listTable: DeliveryItemFromWarehouseDTO[]): ShopCheckInNewItemsDTO[] {
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

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }
}
