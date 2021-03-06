import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CheckedInItemsDTO} from '../checked-in-items-DTOs/CheckedInItemsDTO';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-checked-in-items-details',
  templateUrl: './checked-in-items-details.component.html',
  styleUrls: ['./checked-in-items-details.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess', alias: 'translate' }}]
})
export class CheckedInItemsDetailsComponent implements OnInit {

  public myForm: FormGroup;
  public newItem: CheckedInItemsDTO;

  constructor(public dialogRef: MatDialogRef<CheckedInItemsDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CheckedInItemsDTO,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.newItem = {
      shop: this.data.shop,
      category: this.data.category,
      quantity: this.data.quantity,
      priceSalesPerUnit: this.data.priceSalesPerUnit,
      priceListPerUnit: this.data.priceListPerUnit,
      discountPercent: this.data.discountPercent,
      deliverySending: this.data.deliverySending,
      warehouseInstruction: this.data.warehouseInstruction,
      shopComment: this.data.shopComment
    };

    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      category: ['', [Validators.required]],
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

  }
}
