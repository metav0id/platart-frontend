import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewDeliveryFromWarehouseComponent} from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {CheckoutSoldItemsComponent} from './checkout-sold-items/checkout-sold-items.component';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {AuthGuard} from "../guards/auth.guard";
import {ViewShopInventoryComponent} from "./view-shop-inventory/view-shop-inventory.component";

const routes: Routes = [
  {path: 'newdeliveryfromwarehouse', component: NewDeliveryFromWarehouseComponent, canActivate: [AuthGuard]},
  {path: 'checkoutsolditems', component: CheckoutSoldItemsComponent, canActivate: [AuthGuard]},
  {path: 'viewshopinventory', component: ViewShopInventoryComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPrincessRoutingModule {
}
