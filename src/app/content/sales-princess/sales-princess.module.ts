import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDeliveryFromWarehouseComponent } from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {SalesPrincessRoutingModule} from "./sales-princess-routing.module";



@NgModule({
  declarations: [NewDeliveryFromWarehouseComponent],
  imports: [
    CommonModule,
    SalesPrincessRoutingModule
  ]
})
export class SalesPrincessModule { }
