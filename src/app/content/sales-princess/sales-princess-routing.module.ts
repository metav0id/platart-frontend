import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NewDeliveryFromWarehouseComponent} from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {CheckoutSoldItemsComponent} from './checkout-sold-items/checkout-sold-items.component';
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {ViewShopInventoryComponent} from "./view-shop-inventory/view-shop-inventory.component";

const routes: Routes = [
  {path: 'newdeliveryfromwarehouse', component: NewDeliveryFromWarehouseComponent},
  {path: 'checkoutsolditems', component: CheckoutSoldItemsComponent},
  {path: 'viewshopinventory', component: ViewShopInventoryComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPrincessRoutingModule {
}
