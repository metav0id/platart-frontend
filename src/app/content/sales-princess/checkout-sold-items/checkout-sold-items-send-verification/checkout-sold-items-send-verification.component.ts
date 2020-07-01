import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SendItemsDTO} from "../checkout-sold-items-DTOs/SendItemsDTO";


@Component({
  selector: 'app-checkout-sold-items-send-verification',
  templateUrl: './checkout-sold-items-send-verification.component.html',
  styleUrls: ['./checkout-sold-items-send-verification.component.css']
})
export class CheckoutSoldItemsSendVerificationComponent implements OnInit {

  public quantityFormControl: FormControl;
  public myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CheckoutSoldItemsSendVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SendItemsDTO
  ) {
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

  onSendClick() {
    if (this.myForm.valid) {

      this.data.sendSoldItemsVerification = true;
      this.dialogRef.close();
    } else {

    }
    this.data.sendSoldItemsVerification = true;
    this.dialogRef.close();
  }
}
