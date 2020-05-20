import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';
import {NewDeliveryToShopComponent} from './new-delivery-to-shop/new-delivery-to-shop.component';
import {NewDeliveryToWarehouseComponent} from './new-delivery-to-warehouse/new-delivery-to-warehouse.component';
import {NewItemCategoryComponent} from './new-item-category/new-item-category.component';
import {FormComponent} from '../comerce/form.component';
import {AuthGuard} from "../guards/auth.guard";
import {WarehouseGuard} from "../guards/warehouse.guard";

const routes: Routes = [
  {path: 'stockinwarehouse', component: StockInWarehouseComponent, canActivate: [AuthGuard]},
  {path: 'newdeliverytoshop', component: NewDeliveryToShopComponent, canActivate: [AuthGuard] },
  {path: 'newdeliverytowarehouse', component: NewDeliveryToWarehouseComponent, canActivate: [AuthGuard] },
  {path: 'newitemcategory', component: NewItemCategoryComponent, canActivate: [AuthGuard] },
  {path: 'comerce', component: FormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseQueenRoutingModule {
}
