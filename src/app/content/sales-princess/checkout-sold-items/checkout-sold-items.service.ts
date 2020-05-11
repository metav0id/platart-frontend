import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopsCurrentInventoryDTO} from '../sales-princess-DTOs/ShopsCurrentInventoryDTO';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ShopsCheckoutSoldItemsDTO} from "./checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO";

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  constructor(private http: HttpClient) {
  }

  private readonly getAllSoldItemsListURL: string = 'http://localhost:8081/shops/getAllSoldItemsList';
  private readonly saveAllSoldItemsListURL: string = 'http://localhost:8081/shops/saveAllSoldItemsList';
  private readonly sendAllSoldItemsListURL: string = 'http://localhost:8081/shops/sendAllSoldItemsList';
  private readonly deleteCurrentSoldItemsListURL: string = 'http://localhost:8081/shops/deleteCurrentSoldItemsList';
  private readonly loadAllSoldItemsListURL: string = 'http://localhost:8081/shops/loadAllCurrentSoldItemsList';

  public getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(environment.getAllCategories, null);
  }

  // get all sold items
  public getAllItemsAllShops(): void {
    this.http.post<ShopsCurrentInventoryDTO[]>(environment.getAllShops, null).subscribe(JsonDto => {
      console.log(JsonDto);
    });
  }

  // save all sold items
  public getAllSoldItemsList(): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(this.getAllSoldItemsListURL, null);
  }

  // save all sold items
  public saveAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<null> {
    return this.http.post<null>(this.saveAllSoldItemsListURL, soldItemList);
  }

  // send all sold items
  public sendAllSoldItemsList(soldItemList: ShopsCheckoutSoldItemsDTO[]): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(this.sendAllSoldItemsListURL, soldItemList);
  }

// delete current sold items list
  public deleteCurrentSoldItemsList(): Observable<null> {
    return this.http.post<null>(this.deleteCurrentSoldItemsListURL, null);
  }

  public loadCurrentSoldItemsList(): Observable<ShopsCheckoutSoldItemsDTO[]> {
    return this.http.post<null>(this.loadAllSoldItemsListURL, null);
  }
}
