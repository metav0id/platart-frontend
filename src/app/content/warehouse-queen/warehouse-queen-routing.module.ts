import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';
import {NewDeliveryToShopComponent} from './new-delivery-to-shop/new-delivery-to-shop.component';
import {NewDeliveryToWarehouseComponent} from './new-delivery-to-warehouse/new-delivery-to-warehouse.component';
import {NewItemCategoryComponent} from '../manager-king/new-item-category/new-item-category.component';
import {FormComponent} from '../manager-king/manager-map/comerce/form.component';
import {AuthGuard} from '../guards/auth.guard';
import {WarehouseGuard} from '../guards/warehouse.guard';


const routes: Routes = [
  {path: 'stockinwarehouse', component: StockInWarehouseComponent, canActivate: [AuthGuard, WarehouseGuard]},
  {path: 'newdeliverytoshop', component: NewDeliveryToShopComponent, canActivate: [AuthGuard, WarehouseGuard]},
  {path: 'newdeliverytowarehouse', component: NewDeliveryToWarehouseComponent, canActivate: [AuthGuard, WarehouseGuard]},
  {path: 'comerce', component: FormComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseQueenRoutingModule {
}
