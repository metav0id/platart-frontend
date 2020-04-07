import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {WarehouseCheckInNewItemDTO} from './warehouse-check-in-new-item-DTO';
import {MatTable} from '@angular/material/table';
import {CdkTable} from '@angular/cdk/table';

@Component({
  selector: 'app-new-delivery-to-warehouse',
  templateUrl: './new-delivery-to-warehouse.component.html',
  styleUrls: ['./new-delivery-to-warehouse.component.css']
})
export class NewDeliveryToWarehouseComponent implements OnInit {
  public displayedColumns: string[] = ['category', 'pricePerUnit', 'quantity', 'price', 'supplierName'];
  public listNewItemsFromSuppliers: WarehouseCheckInNewItemDTO[] = [];
  public newItemFromSupplier: WarehouseCheckInNewItemDTO = {
    category: '',
    pricePerUnit: 0,
    quantity: 0,
    supplierName: 'Lorenzo von Matterhorn'
  };
  public dummyList: WarehouseCheckInNewItemDTO[] = [
    {
      category: 'Bracelet',
      quantity: 10,
      pricePerUnit: 300,
      supplierName: 'Swarowski'
    }];
  @ViewChild('myCheckinProductsTable') table: MatTable<any>;

  constructor() {
  }

  ngOnInit(): void {
    this.listNewItemsFromSuppliers = this.dummyList;
    console.log(this.listNewItemsFromSuppliers);

  }

  addNewItemToList(): void {
    const newItem: WarehouseCheckInNewItemDTO = {
      category: this.newItemFromSupplier.category,
      pricePerUnit: this.newItemFromSupplier.pricePerUnit,
      quantity: this.newItemFromSupplier.quantity,
      supplierName: this.newItemFromSupplier.supplierName
    };

    const isCategoryNotEmpty = newItem.category !== '';
    const isPricePerUnitNotEmpty = newItem.pricePerUnit > 0;
    const isQuantityNotEmpty = newItem.quantity > 0;
    const isSupplierNotEmpty = newItem.supplierName !== '';
    if (isCategoryNotEmpty && isPricePerUnitNotEmpty && isQuantityNotEmpty && isSupplierNotEmpty) {
      this.listNewItemsFromSuppliers.push(newItem);
      console.log(this.listNewItemsFromSuppliers);
      this.table.renderRows();
    } else {
      console.log('Please insert valid parameters');
    }
  }
}
