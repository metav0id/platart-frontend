import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO';
import {ShopDTO} from '../../warehouse-queen/new-delivery-to-shop/new-delivery-to-shop-DTOs/shop-dto';
import {ShopNameDTO} from './checkout-sold-items-DTOs/Shop-name-DTO';
import {SaveCheckoutSoldItemsDTO} from './checkout-sold-items-DTOs/SaveCheckoutSoldItemsDTO';
import {WarehouseItemCategoryDTO} from './checkout-sold-items-DTOs/WarehouseItemCategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  constructor(private http: HttpClient) {
  }

  public getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.get<WarehouseItemCategoryDTO[]>(environment.getAllCategories);
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
    return this.http.post<null>(environment.saveShopSpecificSoldItemsList, saveItemsDTO);
  }

  // send shop specific sold items
  public sendSpecificShopSoldItemsList(
    selectedShop: string,
    soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<ShopsCheckoutSoldItemsDTO[]> {
    const saveItemsDTO: SaveCheckoutSoldItemsDTO = {
      shop: selectedShop,
      itemsDTOList: soldItemList
    };
    return this.http.post<null>(environment.sendSpecificShopSoldItemsList, saveItemsDTO);
  }

  // delete shop specific checkout sold items list
  public deleteShopSpecificCheckoutSoldItemsList(shopSelected: string): Observable<null> {
    const shopDTO: ShopNameDTO = {
      shop: shopSelected
    };
    return this.http.post<null>(environment.deleteShopSpecificCheckoutSoldItemsList, shopDTO);
  }

  public getListShops(): Observable<ShopDTO[]> {
    return this.http.get<ShopDTO[]>(environment.getAllShops);
  }

  public verifyAvailability(newItem: ShopsCheckoutSoldItemsDTO): Observable<ShopsCheckoutSoldItemsDTO> {
    return this.http.post<ShopsCheckoutSoldItemsDTO>(environment.getShopInventoryAvailability, newItem);
  }

}
