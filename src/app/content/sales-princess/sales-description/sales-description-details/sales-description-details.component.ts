import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';
import {ShopsAllSoldItemsDTO} from '../sales-description-DTOs/ShopsAllSoldItemsDTO';

@Component({
  selector: 'app-sales-description-details',
  templateUrl: './sales-description-details.component.html',
  styleUrls: ['./sales-description-details.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess', alias: 'translate' }}]
})
export class SalesDescriptionDetailsComponent implements OnInit {

  public myForm: FormGroup;
  public newItem: ShopsAllSoldItemsDTO;

  constructor(
    public dialogRef: MatDialogRef<SalesDescriptionDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShopsAllSoldItemsDTO,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.newItem = {
      id: this.data.id,
      shop: this.data.shop,
      category: this.data.category,
      quantity: this.data.quantity,
      priceSalesPerUnit: this.data.priceSalesPerUnit,
      priceListPerUnit: this.data.priceListPerUnit,
      discountPercent: this.data.discountPercent,
      deliverySending: this.data.deliverySending,
      revenuePerUnit: this.data.revenuePerUnit,
      itemLastSold: this.data.itemLastSold,
      comment: this.data.comment
    };

    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      category: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted');
      this.dialogRef.close();
    } else {
      console.log('Error by input');
    }
  }

}
