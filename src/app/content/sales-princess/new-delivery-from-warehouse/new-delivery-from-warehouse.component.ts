import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import {WarehouseItemCategoryDTO} from '../../warehouse-queen/warehouseCategory/warehouse-item-category-DTO';
import {MatTable} from '@angular/material/table';
import {NewDeliveryToWarehouseService} from '../../warehouse-queen/new-delivery-to-warehouse/new-delivery-to-warehouse.service';
import {SalesItemCategoryDTO} from './sales-item-category-dto';
import {PeriodicElement} from './periodic-element';
import {MatDialog} from '@angular/material/dialog';
import {NewDeliveryFromWarehouseDetailsComponent} from
    './new-delivery-from-warehouse-details/new-delivery-from-warehouse-details.component';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-new-delivery-from-warehouse',
  templateUrl: './new-delivery-from-warehouse.component.html',
  styleUrls: ['./new-delivery-from-warehouse.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess/newDeliveryFromWarehouse', alias: 'translate' }}]
})
export class NewDeliveryFromWarehouseComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'category', 'salesPrice', 'quantity', 'action'];
  private listNewItemsFromWarehouse: PeriodicElement[] = [];
  public listItemsToShopInventory = [];
  public newItemFromWarehouse: PeriodicElement = {
    position: 0,
    category: '',
    listPrice: 0,
    salesPrice: 0,
    quantity: 0,
    originalQuantity: 100,
    timestamp: '',
    comment: ''
  };

  // TEST-DATA
  private newItemOnList1 = {
    position: 1,
    category: 'Kette',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    originalQuantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };
  private newItemOnList2 = {
    position: 1,
    category: 'Ring',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    originalQuantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };
  private newItemOnList3 = {
    position: 1,
    category: 'Kette',
    listPrice: 25,
    salesPrice: 15,
    quantity: 100,
    originalQuantity: 100,
    timestamp: '22.04.2020',
    comment: ''
  };


  /**  */
  public selection = new SelectionModel<PeriodicElement>(true, []);

  /** Is used to increase position attribute of list elements constantly */
  private counter = 1;

  /** Category selection */
  public categoryControl = new FormControl('', Validators.required);

  public categoryItems: SalesItemCategoryDTO[] = [{category: 'Kette'}, {category: 'Ring'}];

  @ViewChild('myCheckinProductsTable') table: MatTable<any>;

  // constructor(private newDeliveryToWarehouseService: NewDeliveryToWarehouseService) {
  // }
  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // this.newDeliveryToWarehouseService.getAllCategories().subscribe(JsonDto => this.categoryItems = JsonDto);
    this.listNewItemsFromWarehouse = [this.newItemOnList1, this.newItemOnList2, this.newItemOnList3];

    // TODO check if reference is copied or new object is created
    this.listItemsToShopInventory = cloneDeep(this.listNewItemsFromWarehouse);
    console.log('List Copy: ' + this.listItemsToShopInventory.toString());
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listItemsToShopInventory.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      console.log('All lines are selected');
      this.listItemsToShopInventory.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  saveList(): void {
    // this.newDeliveryToWarehouseService.saveList(this.listNewItemsFromWarehouse);
    this.listItemsToShopInventory = [];
    this.table.renderRows();
  }

  openDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(NewDeliveryFromWarehouseDetailsComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

}
