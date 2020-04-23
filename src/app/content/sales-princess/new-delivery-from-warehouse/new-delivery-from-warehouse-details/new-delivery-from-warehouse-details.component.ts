import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PeriodicElement} from '../periodic-element';

@Component({
  selector: 'app-new-delivery-from-warehouse-details',
  templateUrl: './new-delivery-from-warehouse-details.component.html',
  styleUrls: ['./new-delivery-from-warehouse-details.component.css']
})
export class NewDeliveryFromWarehouseDetailsComponent implements OnInit {
  public toogleInput: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<NewDeliveryFromWarehouseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    console.log('Comment: ' + this.data.comment);
    this.dialogRef.close();
  }

  onEditClick(){
    this.toogleInput = false;
    console.log(this.toogleInput);
  }

}
