import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, Validators} from '@angular/forms';
import {PeriodicElement} from './periodic-element';
import {NewDeliveryToWarehouseService} from './new-delivery-to-warehouse.service';
import {WarehouseItemCategoryDTO} from '../warehouseCategory/warehouse-item-category-DTO';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-new-delivery-to-warehouse',
  templateUrl: './new-delivery-to-warehouse.component.html',
  styleUrls: ['./new-delivery-to-warehouse.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'warehouseQueen/newDeliveryToWarehouse', alias: 'translate' }}]
})

export class NewDeliveryToWarehouseComponent implements OnInit {
  public displayedColumns: string[] = ['select', 'category', 'priceListPerUnit', 'quantity', 'priceSupplierPerUnit', 'supplierName'];
  public listNewItemsFromSuppliers: PeriodicElement[] = [];
  public newItemFromSupplier: PeriodicElement = {
    position: 0,
    category: '',
    priceListPerUnit: 0,
    priceSupplierPerUnit: 0,
    quantity: 0,
    supplierName: ''
  };

  /** Is used to enable selection in table */
  public selection = new SelectionModel<PeriodicElement>(true, []);

  /** Is used to increase position attribute of list elements constantly */
  private counter = 1;

  /** Category selection with form control for empty selection */
  public categoryControl = new FormControl('', Validators.required);
  public categoryItems: WarehouseItemCategoryDTO[] = [];

  @ViewChild('myCheckinProductsTable') table: MatTable<any>;
  constructor(private newDeliveryToWarehouseService: NewDeliveryToWarehouseService) {
  }

  ngOnInit(): void {
    this.newDeliveryToWarehouseService.getAllCategories().subscribe(JsonDto => this.categoryItems = JsonDto);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listNewItemsFromSuppliers.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      console.log('All lines are selected');
      this.listNewItemsFromSuppliers.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  /** Add a new item to table */
  addNewItemToList(): void {
    const newItem: PeriodicElement = {
      position: this.counter++,
      category: this.newItemFromSupplier.category,
      priceListPerUnit: this.newItemFromSupplier.priceListPerUnit,
      priceSupplierPerUnit: this.newItemFromSupplier.priceSupplierPerUnit,
      quantity: this.newItemFromSupplier.quantity,
      supplierName: this.newItemFromSupplier.supplierName
    };
    const isCategoryNotEmpty = !this.categoryControl.hasError('required');
    const isPricePerUnitNotEmpty = newItem.priceListPerUnit > 0 && newItem.priceSupplierPerUnit > 0;
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

  /** Delete all selected items */
  deleteItem(): void {
    for (const selectedItem of this.selection.selected) {

      const removeIndex = this.listNewItemsFromSuppliers.map((item) => {
        return item.position;
      }).indexOf(selectedItem.position);

      this.listNewItemsFromSuppliers.splice(removeIndex, 1);
    }
    this.table.renderRows();
    this.selection.clear();
  }

  saveList(): void {
    this.newDeliveryToWarehouseService.saveList(this.listNewItemsFromSuppliers);
    this.listNewItemsFromSuppliers = [];
    this.table.renderRows();
  }
}
