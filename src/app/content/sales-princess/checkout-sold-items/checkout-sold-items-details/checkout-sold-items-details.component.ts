import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ShopsCheckoutSoldItemsDTO} from '../checkout-sold-items-DTOs/ShopsCheckoutSoldItemsDTO';
import Swal from 'sweetalert2';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-checkout-sold-items-details',
  templateUrl: './checkout-sold-items-details.component.html',
  styleUrls: ['./checkout-sold-items-details.component.css'],
  providers: [
    {provide: TRANSLOCO_SCOPE, useValue: {scope: 'salesPrincess', alias: 'translate'}}
  ],
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
    if ( this.data !== null && this.data.length > 0 ) {
      const index: number = this.data.indexOf(item);
      if (this.data.length > 1) {
        this.data.splice(index, 1);
        // tslint:disable-next-line:triple-equals
      } else if (this.data.length == 1) {
        this.data = [];
        this.onSubmit();
      }

      Swal.fire({
        icon: 'success',
        title: 'Item deleted',
        text: 'The clicked-on item was removed from the list of checkout-items.'
      });
    } else {
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.dialogRef.close();
    }
  }
}
