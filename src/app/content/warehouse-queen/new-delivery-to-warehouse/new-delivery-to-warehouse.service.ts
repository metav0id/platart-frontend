import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PeriodicElement} from './periodic-element';
import {WarehouseCheckInNewItemDTO} from './warehouse-check-in-new-item-DTO';
import {Observable} from 'rxjs';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
import {environment} from '../../../../environments/environment';
import {TooltipPosition} from "@angular/material/tooltip";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class NewDeliveryToWarehouseService {


  constructor(private http: HttpClient) {
  }

  public saveList(listDeliveryItems: PeriodicElement[]): void {
    const listDTO: WarehouseCheckInNewItemDTO[] = [];
    for (const item of listDeliveryItems) {
      const itemDTO: WarehouseCheckInNewItemDTO = {
        category: item.category,
        quantity: item.quantity,
        priceListPerUnit: item.priceListPerUnit,
        priceSupplierPerUnit: item.priceSupplierPerUnit,
        supplierName: item.supplierName
      };
      listDTO.push(itemDTO);
    }
    this.http.post(environment.saveListDeliverySupplier, listDeliveryItems).subscribe();
  }

  getAllCategories(): Observable<WarehouseItemCategoryDTO[]> {
    return this.http.post<WarehouseItemCategoryDTO[]>(environment.getAllCategories, null);
  }
}
