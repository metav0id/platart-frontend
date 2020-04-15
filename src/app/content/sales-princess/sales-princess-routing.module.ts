import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NewDeliveryFromWarehouseComponent} from "./new-delivery-from-warehouse/new-delivery-from-warehouse.component";

const routes: Routes = [
  {path: 'newdeliveryfromwarehouse', component: NewDeliveryFromWarehouseComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPrincessRoutingModule { }
