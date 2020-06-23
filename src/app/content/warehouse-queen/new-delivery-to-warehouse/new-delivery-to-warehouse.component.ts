import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PeriodicElement} from './periodic-element';
import {NewDeliveryToWarehouseService} from './new-delivery-to-warehouse.service';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import {CategoryService} from '../../services/category.service';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';

@Component({
  selector: 'app-new-delivery-to-warehouse',
  templateUrl: './new-delivery-to-warehouse.component.html',
  styleUrls: ['./new-delivery-to-warehouse.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: {scope: 'warehouseQueen', alias: 'translate'}}]
})

export class NewDeliveryToWarehouseComponent implements OnInit {
  /** tooltip features**/
  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

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
  public myForm: FormGroup;

  @ViewChild('myCheckinProductsTable') table: MatTable<any>;

  static invalidNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value < 0) {
      return {invalidNumber: true};
    }
    return null;
  }

  constructor(private newDeliveryToWarehouseService: NewDeliveryToWarehouseService,
              private categoryService: CategoryService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.categoryService.getAllActivatedCategories().subscribe(JsonDto => this.categoryItems = JsonDto);
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      quantity: [0, [Validators.required, NewDeliveryToWarehouseComponent.invalidNumberValidator]],
      priceListPerUnit: [0, [Validators.required, NewDeliveryToWarehouseComponent.invalidNumberValidator]],
      priceSupplierPerUnit: [0, [Validators.required, NewDeliveryToWarehouseComponent.invalidNumberValidator]],
      supplierName: ['', [Validators.required]]
    });
  }

  onSubmit(userData) {
    if (this.myForm.valid) {
      this.listNewItemsFromSuppliers.push(userData);
      this.table.renderRows();
    } else {
      console.log('Error entering formular');
    }
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
