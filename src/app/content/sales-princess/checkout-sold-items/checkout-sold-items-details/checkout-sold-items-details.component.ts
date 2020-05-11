import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopsCheckoutSoldItemsDTO} from "../checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO";

@Component({
  selector: 'app-checkout-sold-items-details',
  templateUrl: './checkout-sold-items-details.component.html',
  styleUrls: ['./checkout-sold-items-details.component.css']
})
export class CheckoutSoldItemsDetailsComponent implements OnInit {
  public quantityFormControl: FormControl;
  public myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CheckoutSoldItemsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShopsCheckoutSoldItemsDTO[]) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  createFormControls(): void {
    this.quantityFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  createForm(): void {
    this.myForm = new FormGroup({
      quantity: this.quantityFormControl
    });
  }

  deleteItemList(item: ShopsCheckoutSoldItemsDTO) {
    console.log('delete: ' + item.category + ' - ' + item.priceListPerUnit);
    const index: number = this.data.indexOf(item);
    console.log('index: ' + index);
    this.data.splice(index, 1);
    console.log(this.data);
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted');
      //this.myForm.reset();
      this.dialogRef.close();
    } else {
      console.log('Error by input');
    }
  }
}
