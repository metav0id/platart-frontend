import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CheckoutTableItems} from "../checkout-sold-items-DTOs/CheckoutTableItems";

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
    @Inject(MAT_DIALOG_DATA) public data: CheckoutTableItems[]
  ) { }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSendClick(): void {
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
