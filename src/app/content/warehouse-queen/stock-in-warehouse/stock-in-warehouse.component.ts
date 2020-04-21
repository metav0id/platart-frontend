import {Component, OnInit, ViewChild} from '@angular/core';
import {WarehouseGetAllItemsDTO} from './WarehouseGetAllItemsDTO';
import {HttpClient} from '@angular/common/http';
import {StockInWarehouseService} from './stock-in-warehouse.service';
import {MatTable, MatTableDataSource} from "@angular/material/table";

/** Is used for table elements */
export interface WarehouseItem {
  position: number;
  category: string;
  pricePerUnit: number;
  quantity: number;
}

@Component({
  selector: 'app-stock-in-warehouse',
  templateUrl: './stock-in-warehouse.component.html',
  styleUrls: ['./stock-in-warehouse.component.css']
})
export class StockInWarehouseComponent implements OnInit {
  displayedColumns: string[] = ['category', 'pricePerUnit', 'quantity', 'value', 'correctQuantity'];

  //public warehouseData: WarehouseGetAllItemsDTO[] = [];
  public warehouseData: WarehouseItem[] = [];
  dataSource = new MatTableDataSource();
  private totalCost: number;
  private totalQuantity: number;
  updateQuantityState: boolean = false;
  updateResponsiblePerson: string = 'somePerson';

  updateWarehouseItem: WarehouseItem = {
    position: -1,
    category: 'someCategory',
    pricePerUnit: -1,
    quantity: -1
  };

  @ViewChild('myWarehouseItemsTable') table: MatTable<any>;
  constructor(private http: HttpClient, private stockInWarehouseService: StockInWarehouseService ) {
  }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(): void {
    this.stockInWarehouseService.getAllItems()
      .subscribe(JsonDto => {
        this.warehouseData = [];
        let counter = 0;
        for (const item of JsonDto){
          let newWarehouseItem: WarehouseItem = {
            position: counter,
            category: item.category,
            pricePerUnit: item.pricePerUnit,
            quantity: item.quantity
          };
          counter++;
          this.warehouseData.push(newWarehouseItem);
        }
        this.table.renderRows();

        this.dataSource = new MatTableDataSource(this.warehouseData);

        // this.warehouseData = JsonDto;
        // console.log(this.warehouseData);
      });
  }

  getTotalCost(): number {
    this.totalCost = 0;
    for (const elem of this.warehouseData) {
      this.totalCost += elem.quantity * elem.pricePerUnit;
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
    console.log('Update Item' + element.category + ' ' + element.pricePerUnit + ' ' + element.quantity)
    this.updateWarehouseItem.position = element.position;
    this.updateWarehouseItem.category = element.category;
    this.updateWarehouseItem.quantity = element.quantity;
    this.updateWarehouseItem.pricePerUnit = element.pricePerUnit;

    this.updateQuantityState = true;
  }

  saveUpdateQuantityButton() {
    this.updateQuantityState = false;

  }
}
