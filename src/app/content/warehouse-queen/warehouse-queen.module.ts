import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseQueenRoutingModule } from './warehouse-queen-routing.module';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';


@NgModule({
  declarations: [
    StockInWarehouseComponent
  ],
  imports: [
    CommonModule,
    WarehouseQueenRoutingModule,
  ]
})
export class WarehouseQueenModule { }
