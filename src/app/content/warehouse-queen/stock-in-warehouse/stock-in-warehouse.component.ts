import {Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseGetAllItemsDTO} from './stock-in-warehouse-DTOs/WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';
import {StockInWarehouseService} from './stock-in-warehouse.service';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {WarehouseItem} from './stock-in-warehouse-DTOs/WarehouseItem';

@Component({
  selector: 'app-stock-in-warehouse',
  templateUrl: './stock-in-warehouse.component.html',
  styleUrls: ['./stock-in-warehouse.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'warehouseQueen', alias: 'translate'}}]
})
export class StockInWarehouseComponent implements OnInit {
  displayedColumns: string[] = ['category', 'priceListPerUnit', 'quantity', 'value'];

  public warehouseData: WarehouseItem[] = [];
  dataSource = new MatTableDataSource();
  private totalCost: number;
  private totalQuantity: number;
  updateQuantityState: boolean = false;
  updateResponsiblePerson: string = 'somePerson';

  updateWarehouseItem: WarehouseItem = {
    position: -1,
    category: 'someCategory',
    priceListPerUnit: -1,
    quantity: -1
  };

  @ViewChild('myWarehouseItemsTable') table: MatTable<any>;

  constructor(private http: HttpClient, private stockInWarehouseService: StockInWarehouseService) {
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.stockInWarehouseService.getAllItems()
      .subscribe(JsonDto => {
        this.warehouseData = [];
        let counter = 0;
        for (const item of JsonDto) {
          const newWarehouseItem: WarehouseItem = {
            position: counter,
            category: item.category,
            priceListPerUnit: item.priceListPerUnit,
            quantity: item.quantity
          };
          counter++;
          this.warehouseData.push(newWarehouseItem);
        }
        this.dataSource = new MatTableDataSource(this.warehouseData);
        this.table.renderRows();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  updateQuantityButton(element: WarehouseItem) {
    this.updateWarehouseItem.position = element.position;
    this.updateWarehouseItem.category = element.category;
    this.updateWarehouseItem.quantity = element.quantity;
    this.updateWarehouseItem.priceListPerUnit = element.priceListPerUnit;

    this.updateQuantityState = true;
  }

  saveUpdateQuantityButton() {
    this.updateQuantityState = false;
  }
}
