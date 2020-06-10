import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TableItem} from '../table-item';

@Component({
  selector: 'app-new-delivery-from-warehouse-details',
  templateUrl: './new-delivery-from-warehouse-details.component.html',
  styleUrls: ['./new-delivery-from-warehouse-details.component.css']
})
export class NewDeliveryFromWarehouseDetailsComponent implements OnInit {
  public quantityFormControl: FormControl;
  public myForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewDeliveryFromWarehouseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TableItem) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.quantityFormControl = new FormControl('', [
      Validators.required
    ]);
  }

  createForm() {
    this.myForm = new FormGroup({
      quantity: this.quantityFormControl
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.dialogRef.close();
    } else {
      console.log('Error by input');
    }
  }
}
