import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';
import {NewDeliveryToShopComponent} from './new-delivery-to-shop/new-delivery-to-shop.component';
import {NewDeliveryToWarehouseComponent} from './new-delivery-to-warehouse/new-delivery-to-warehouse.component';
import {NewItemCategoryComponent} from "./new-item-category/new-item-category.component";
import {FormComponent} from "../comerce/form.component";

const routes: Routes = [
  {path: 'stockinwarehouse', component: StockInWarehouseComponent},
  {path: 'newdeliverytoshop', component: NewDeliveryToShopComponent},
  {path: 'newdeliverytowarehouse', component: NewDeliveryToWarehouseComponent},
  {path: 'newitemcategory', component: NewItemCategoryComponent},
  {path: 'comerce', component: FormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseQueenRoutingModule { }
