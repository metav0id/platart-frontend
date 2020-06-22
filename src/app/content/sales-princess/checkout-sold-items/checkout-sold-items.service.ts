import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopsCurrentInventoryDTO} from '../sales-princess-DTOs/ShopsCurrentInventoryDTO';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
import {observable, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO';
import {ShopDTO} from '../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  constructor(private http: HttpClient) {
  }


  // get all sold items
  public getAllItemsAllShops(): void {
    this.http.post<ShopsCurrentInventoryDTO[]>(environment.getAllShops, null).subscribe(JsonDto => {
    });
  }

  // save all sold items
  public getAllSoldItemsList(): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(environment.getAllSoldItemsListURL, null);
  }

  // save all sold items
  public saveAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<null> {
    return this.http.post<null>(environment.saveAllSoldItemsListURL, soldItemList);
  }

  // send all sold items
  public sendAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(environment.sendAllSoldItemsListURL, soldItemList);
  }

  // delete current sold items list
  public deleteCurrentSoldItemsList(): Observable<null> {
    return this.http.post<null>(environment.deleteCurrentSoldItemsListURL, null);
  }

  public loadCurrentSoldItemsList(): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(environment.loadAllSoldItemsListURL, null);
  }

  public verifyAvailability(newItem: ShopsCheckoutSoldItemsDTO): Observable<ShopsCheckoutSoldItemsDTO> {

    return this.http.post<ShopsCheckoutSoldItemsDTO>(environment.getShopInventoryAvailability, newItem);
  }

}
