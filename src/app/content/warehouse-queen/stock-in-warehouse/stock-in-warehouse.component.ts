import { Component, OnInit } from '@angular/core';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';
import {StockInWarehouseService} from './stock-in-warehouse.service';

@Component({
  selector: 'app-stock-in-warehouse',
  templateUrl: './stock-in-warehouse.component.html',
  styleUrls: ['./stock-in-warehouse.component.css']
})
export class StockInWarehouseComponent implements OnInit {
  displayedColumns: string[] = ['category', 'pricePerUnit', 'quantity', 'value'];
  public warehouseData: WarehouseGetAllItemsDTO[] = [];
  private totalCost: number;
  private totalQuantity: number;

  constructor(private http: HttpClient, private stockInWarehouseService: StockInWarehouseService ) {
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.stockInWarehouseService.getAllItems()
      .subscribe(JsonDto => {
        this.warehouseData = JsonDto;
        console.log(this.warehouseData);
      });
  }

  getTotalCost(): number {
    this.totalCost = 0;
    for (const elem of this.warehouseData) {
      this.totalCost += elem.quantity * elem.priceListPerUnit;
    }
    return this.totalCost;
  }

  getSumQuantity(): number {
    this.totalQuantity = 0;
    for (const elem of this.warehouseData) {
      this.totalQuantity += elem.quantity;
    }
    return this.totalQuantity;
  }

}
