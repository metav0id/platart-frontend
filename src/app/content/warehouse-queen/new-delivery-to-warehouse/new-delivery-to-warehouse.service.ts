import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PeriodicElement} from './periodic-element';
import {WarehouseCheckInNewItemDTO} from './warehouse-check-in-new-item-DTO';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../warehouseDTOs/warehouse-item-category-DTO';

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToWarehouseService {
  private readonly saveListDeliverySupplierURL = 'http://localhost:8081/warehouse/savelistdeliverysupplier';
  private readonly getAllCategoriesURL = 'http://localhost:8081/warehouse/getAllCategories';

  constructor(private http: HttpClient) {
  }

  public saveList(listDeliveryItems: PeriodicElement[]): void {
    const listDTO: WarehouseCheckInNewItemDTO[] = [];
    for (const item of listDeliveryItems) {
      const itemDTO: WarehouseCheckInNewItemDTO = {
        category: item.category,
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
        price: item.price,
        supplierName: item.supplierName
      };
      listDTO.push(itemDTO);
    }
    this.http.post(this.saveListDeliverySupplierURL, listDeliveryItems).subscribe();
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(this.getAllCategoriesURL, null);
  }
}
