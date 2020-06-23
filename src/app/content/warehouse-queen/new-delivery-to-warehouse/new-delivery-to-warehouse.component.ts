import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NewDeliveryToWarehouseService} from './new-delivery-to-warehouse.service';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {TooltipPosition} from '@angular/material/tooltip';
import {CategoryService} from '../../services/category.service';
import {WarehouseItemCategoryDTO} from '../../services/warehouse-item-category-DTO';
import {WarehouseCheckInNewItemDTO} from './warehouse-check-in-new-item-DTO';
import Swal from "sweetalert2";

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
  public listNewItemsFromSuppliers: WarehouseCheckInNewItemDTO[] = [];

  /** Category selection with form control for empty selection */
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

  onSubmit(userData: WarehouseCheckInNewItemDTO) {
    if (this.myForm.valid) {
      userData.isChecked = false;
      this.listNewItemsFromSuppliers.push(userData);
      this.table.renderRows();
    }
  }

  saveList(): void {
    Swal.showLoading();
    this.newDeliveryToWarehouseService.saveList(this.listNewItemsFromSuppliers).subscribe(result => {
      if (result) {
        this.listNewItemsFromSuppliers = [];
        this.table.renderRows();
        Swal.close();
        Swal.fire(
          'Success',
          'List saved',
          'success'
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'List could not be saved. Please try again.'
        });
      }
    });

  }

  selectItem(element: WarehouseCheckInNewItemDTO): void {
    element.isChecked = !element.isChecked;
  }

  deleteItem() {
    this.listNewItemsFromSuppliers.filter(obj => obj.isChecked).forEach(obj => {
      const index = this.listNewItemsFromSuppliers.indexOf(obj);
      this.listNewItemsFromSuppliers.splice(index, 1);
    });
    this.table.renderRows();
  }
}
