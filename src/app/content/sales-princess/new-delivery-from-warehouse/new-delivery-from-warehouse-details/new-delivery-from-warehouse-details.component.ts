import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TableItem} from '../table-item';

@Component({
  selector: 'app-new-delivery-from-warehouse-details',
  templateUrl: './new-delivery-from-warehouse-details.component.html',
  styleUrls: ['./new-delivery-from-warehouse-details.component.css']
})
export class NewDeliveryFromWarehouseDetailsComponent implements OnInit {
  public myForm: FormGroup;

  /**
   * This method is used for validating number input of form. Is a Validation-Function.
   * @param control
   */
  static invalidNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value <= 0) {
      return {invalidNumber: true};
    }
    return null;
  }

  constructor(
    public dialogRef: MatDialogRef<NewDeliveryFromWarehouseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableItem,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      quantity: [this.data.quantity, [Validators.required, NewDeliveryFromWarehouseDetailsComponent.invalidNumberValidator]],
      comment: [this.data.comment, [Validators.required]]
    });
  }

  onSubmit(userData) {
    if (this.myForm.valid) {
      this.saveItem(userData);
      this.dialogRef.close();
    } else {
      console.log('Error by input');
    }
  }

  saveItem(userData) {
    this.data.quantity = userData.quantity;
    this.data.comment = userData.comment;
  }
}
