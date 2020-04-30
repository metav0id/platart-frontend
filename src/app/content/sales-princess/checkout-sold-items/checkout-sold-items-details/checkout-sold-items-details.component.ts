import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CheckoutTableCategoryItems} from '../checkout-sold-items-DTOs/CheckoutTableCategoryItems';

@Component({
  selector: 'app-checkout-sold-items-details',
  templateUrl: './checkout-sold-items-details.component.html',
  styleUrls: ['./checkout-sold-items-details.component.css']
})
export class CheckoutSoldItemsDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CheckoutSoldItemsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutTableCategoryItems[]) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteItemList(item: CheckoutTableCategoryItems) {
    console.log('delete: ' + item.category + ' - ' + item.priceListPerUnit);
    const index: number = this.data.indexOf(item);
    console.log('index: ' + index);
    this.data.splice(index, 1);
    console.log(this.data);
  }
}
