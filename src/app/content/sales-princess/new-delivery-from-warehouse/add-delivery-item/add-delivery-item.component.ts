import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeliveryItemFromWarehouseDTO} from '../DeliveryItemFromWarehouseDTO';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {WarehouseItemCategoryDTO} from "../../../services/warehouse-item-category-DTO";
import {CategoryService} from "../../../services/category.service";
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';

@Component({
  selector: 'app-add-delivery-item',
  templateUrl: './add-delivery-item.component.html',
  styleUrls: ['./add-delivery-item.component.css'],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: {scope: 'salesPrincess', alias: 'translate'}},
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class AddDeliveryItemComponent implements OnInit {
  public myForm: FormGroup;

  public newItem: DeliveryItemFromWarehouseDTO = {
    identifierOnDeliveryList: -1,
    category: '',
    quantity: 0,
    originalQuantity: 0,
    priceListPerUnit: 0,
    priceSalesPerUnit: 0,
    timestamp: '',
    comment: ''
  };
  public categoryItems: WarehouseItemCategoryDTO[] = [];
  public date = new Date();

  static invalidNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value <= 0) {
      return {invalidNumber: true};
    }
    return null;
  }

  constructor(
    public dialogRef: MatDialogRef<AddDeliveryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeliveryItemFromWarehouseDTO[],
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.categoryService.getAllActivatedCategories().subscribe(obj => this.categoryItems = obj);
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      timestamp: ['', [Validators.required]],
      quantity: [null, [Validators.required, AddDeliveryItemComponent.invalidNumberValidator]],
      priceListPerUnit: ['', [Validators.required, AddDeliveryItemComponent.invalidNumberValidator]],
      priceSalesPerUnit: ['', [Validators.required, AddDeliveryItemComponent.invalidNumberValidator]],
      comment: ['', [Validators.required]]
    });
  }

  onSubmit(userData) {
    if (this.myForm.valid) {
      this.saveItem(userData);
      this.dialogRef.close();
    } else {

    }
  }

  saveItem(userData) {
    this.newItem.category = userData.category;
    this.newItem.timestamp = userData.timestamp;
    this.newItem.quantity = userData.quantity;
    this.newItem.priceListPerUnit = userData.priceListPerUnit;
    this.newItem.priceSalesPerUnit = userData.priceSalesPerUnit;
    this.newItem.comment = userData.comment;
    this.newItem.originalQuantity = userData.quantity;
    this.data.push(this.newItem);
  }
}
