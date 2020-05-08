import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PeriodicElement} from '../periodic-element';
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

  public newItem: PeriodicElement = {
    position: 0,
    category: '',
    quantity: 0,
    originalQuantity: 0,
    listPrice: 0,
    salesPrice: 0,
    timestamp: '',
    comment: ''
  };
  public categoryItems = [{category: 'Pulsera'}, {category: 'Sabato'}];
  public date = new Date();

  static invalidNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value <= 0) {
      return {invalidNumber: true};
    }
    return null;
  }

  constructor(
    public dialogRef: MatDialogRef<AddDeliveryItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement[],
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
      console.log('Form submitted');
      this.saveItem(userData);
      this.dialogRef.close();
    } else {
      console.log('Error by input');
    }
  }

  saveItem(userData) {
    this.newItem.category = userData.category;
    this.newItem.timestamp = userData.timestamp;
    this.newItem.quantity = userData.quantity;
    this.newItem.listPrice = userData.priceListPerUnit;
    this.newItem.salesPrice = userData.priceSalesPerUnit;
    this.newItem.comment = userData.comment;
    this.newItem.originalQuantity = userData.quantity;
    this.data.push(this.newItem);
  }
}