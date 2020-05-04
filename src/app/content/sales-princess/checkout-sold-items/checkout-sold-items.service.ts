import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopsCurrentInventoryDTO} from '../sales-princess-DTOs/ShopsCurrentInventoryDTO';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutSoldItemsService {

  constructor(private http: HttpClient) {
  }

  private readonly saveAllSoldItemsListURL: string = 'http://localhost:8081/shops/saveAllSoldItemsList';
  private readonly sendAllSoldItemsListURL: string = 'http://localhost:8081/shops/sendAllSoldItemsList';

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
  public saveAllSoldItemsList(soldItemList: WarehouseItemCategoryDTO[]): Observable<null> {
    return this.http.post<null>(this.saveAllSoldItemsListURL, soldItemList);
  }

  // send all sold items
  public sendAllSoldItemsList(soldItemList: WarehouseItemCategoryDTO[]): Observable<null> {
    return this.http.post<null>(this.sendAllSoldItemsListURL, soldItemList);
  }



}
