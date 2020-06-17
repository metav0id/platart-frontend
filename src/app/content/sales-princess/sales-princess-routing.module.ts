import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewDeliveryFromWarehouseComponent} from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {CheckoutSoldItemsComponent} from './checkout-sold-items/checkout-sold-items.component';
import {AuthGuard} from '../guards/auth.guard';
import {ViewShopInventoryComponent} from './view-shop-inventory/view-shop-inventory.component';
import {ShopGuard} from '../guards/shop.guard';
import {CheckedInItemsComponent} from './checked-in-items/checked-in-items.component';
import {SalesDescriptionComponent} from './sales-description/sales-description.component';
import {ManagerGuard} from '../guards/manager.guard';

const routes: Routes = [
  {path: 'newdeliveryfromwarehouse', component: NewDeliveryFromWarehouseComponent, canActivate: [AuthGuard, ShopGuard]},
  {path: 'checkoutsolditems', component: CheckoutSoldItemsComponent, canActivate: [AuthGuard, ShopGuard]},
  {path: 'viewshopinventory', component: ViewShopInventoryComponent, canActivate: [AuthGuard, ShopGuard]},
  {path: 'checkedinitems', component: CheckedInItemsComponent, canActivate: [AuthGuard, ShopGuard]},
  {path: 'salesdescription', component: SalesDescriptionComponent, canActivate: [AuthGuard, ManagerGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPrincessRoutingModule {
}
