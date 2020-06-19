import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopsCurrentInventoryDTO} from '../sales-princess-DTOs/ShopsCurrentInventoryDTO';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
import {observable, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO';
import {ShopDTO} from '../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto';
import {ShopNameDTO} from './checkout-sold-items-DTOs/Shop-name-DTO';
import {SaveCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/SaveCheckoutSoldItemsDTO';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  constructor(private http: HttpClient) {
  }


  // get all sold items for a specfic shop
  public getSpecificShopSoldItemsList(selectedShop: string): Observable<ShopsCheckoutSoldItemsDTO[]> {
    const shopDTO: ShopNameDTO = {
      shop: selectedShop
    };
    return this.http.post<null>(environment.getShopSpecificSoldItemsList, shopDTO);
  }

  // save all sold items
  public saveSpecificShopSoldItemsList(selectedShop: string, soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<null> {
    const saveItemsDTO: SaveCheckoutSoldItemsDTO = {
      shop: selectedShop,
      itemsDTOList: soldItemList
    };
    return this.http.post<null>(environment.saveAllSoldItemsListURL, saveItemsDTO);
  }

  // save all sold items
  public saveAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<null> {
    return this.http.post<null>(environment.saveAllSoldItemsListURL, soldItemList);
  }

  // send shop specific sold items
  public sendSpecificShopSoldItemsList(
    selectedShop: string,
    soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<ShopsCheckoutSoldItemsDTO[]> {
    const saveItemsDTO: SaveCheckoutSoldItemsDTO = {
      shop: selectedShop,
      itemsDTOList: soldItemList
    };
    return this.http.post<null>(environment.sendAllSoldItemsListURL, saveItemsDTO);
  }

  // send all sold items
  public sendAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(environment.sendAllSoldItemsListURL, soldItemList);
  }

  // TODO: update URL
  // delete shop specific checkout sold items list
  public deleteShopSpecificCheckoutSoldItemsList(shopSelected: string): Observable<null> {
    const shopDTO: ShopNameDTO = {
      shop: shopSelected
    };
    return this.http.post<null>(environment.deleteCurrentSoldItemsListURL, shopDTO);
  }

  public loadCurrentSoldItemsList(): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(environment.loadAllSoldItemsListURL, null);
  }

  public verifyAvailability(newItem: ShopsCheckoutSoldItemsDTO): Observable<ShopsCheckoutSoldItemsDTO> {

    return this.http.post<ShopsCheckoutSoldItemsDTO>(environment.getShopInventoryAvailability, newItem);
  }

}
