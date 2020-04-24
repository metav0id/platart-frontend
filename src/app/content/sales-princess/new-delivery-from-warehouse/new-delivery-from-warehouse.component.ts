import { Component, OnInit } from '@angular/core';
import {TRANSLOCO_SCOPE} from '@ngneat/transloco';

@Component({
  selector: 'app-new-delivery-from-warehouse',
  templateUrl: './new-delivery-from-warehouse.component.html',
  styleUrls: ['./new-delivery-from-warehouse.component.css'],
  providers: [{provide: TRANSLOCO_SCOPE, useValue: { scope: 'salesPrincess/newDeliveryFromWarehouse', alias: 'translate' }}]
})
export class NewDeliveryFromWarehouseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
