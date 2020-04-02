import { Component, OnInit } from '@angular/core';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';
import {StockInWarehouseService} from './stock-in-warehouse.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-stock-in-warehouse',
  templateUrl: './stock-in-warehouse.component.html',
  styleUrls: ['./stock-in-warehouse.component.css']
})
export class StockInWarehouseComponent implements OnInit {
  public warehouseData: WarehouseGetAllItemsDTO[] = [];

  constructor(private http: HttpClient, private stockInWarehouseService: StockInWarehouseService ) {
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.stockInWarehouseService.getAllItems()
      .subscribe(JsonDto => {
        this.warehouseData = JsonDto;
        console.log('Test');
        console.log(this.warehouseData);
      });
  }

}
