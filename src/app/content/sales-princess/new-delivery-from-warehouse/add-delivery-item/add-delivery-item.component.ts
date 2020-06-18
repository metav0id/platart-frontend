import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DeliveryItemFromWarehouseDTO} from '../DeliveryItemFromWarehouseDTO';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-delivery-item',
  templateUrl: './add-delivery-item.component.html',
  styleUrls: ['./add-delivery-item.component.css']
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
  public categoryItems = [{category: 'Pulsera'}, {category: 'Zapato'}];
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
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
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
