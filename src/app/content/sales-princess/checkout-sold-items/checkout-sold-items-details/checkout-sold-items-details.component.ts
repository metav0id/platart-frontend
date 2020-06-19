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
    const index: number = this.data.indexOf(item);
    this.data.splice(index, 1);

  }

  onSubmit() {
    if (this.myForm.valid) {

      this.dialogRef.close();
    } else {

    }
  }
}
