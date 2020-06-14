import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewDeliveryFromWarehouseComponent} from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {SalesPrincessRoutingModule} from './sales-princess-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {CdkTableModule} from '@angular/cdk/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {NewDeliveryFromWarehouseDetailsComponent} from './new-delivery-from-warehouse/new-delivery-from-warehouse-details/new-delivery-from-warehouse-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CheckoutSoldItemsComponent} from './checkout-sold-items/checkout-sold-items.component';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { CheckoutSoldItemsDetailsComponent } from './checkout-sold-items/checkout-sold-items-details/checkout-sold-items-details.component';
import {MatCardModule} from '@angular/material/card';
import {TranslocoRootModule} from '../../transloco-root.module';
import { CheckoutSoldItemsSendVerificationComponent } from './checkout-sold-items/checkout-sold-items-send-verification/checkout-sold-items-send-verification.component';
import { ViewShopInventoryComponent } from './view-shop-inventory/view-shop-inventory.component';
import { AddDeliveryItemComponent } from './new-delivery-from-warehouse/add-delivery-item/add-delivery-item.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CheckedInItemsComponent } from './checked-in-items/checked-in-items.component';
import {MatSortModule} from "@angular/material/sort";
import { CheckedInItemsDetailsComponent } from './checked-in-items/checked-in-items-details/checked-in-items-details.component';


@NgModule({
  declarations: [
    NewDeliveryFromWarehouseComponent,
    NewDeliveryFromWarehouseDetailsComponent,
    CheckoutSoldItemsComponent,
    CheckoutSoldItemsDetailsComponent,
    CheckoutSoldItemsSendVerificationComponent,
    ViewShopInventoryComponent,
    CheckoutSoldItemsSendVerificationComponent,
    AddDeliveryItemComponent,
    CheckedInItemsComponent,
    CheckedInItemsDetailsComponent
  ],
  imports: [
    CommonModule,
    SalesPrincessRoutingModule,
    CdkTableModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatButtonModule,
    TranslocoRootModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    MatSortModule
  ],
  entryComponents: [
    NewDeliveryFromWarehouseComponent,
    CheckoutSoldItemsComponent
  ]
})
export class SalesPrincessModule {
}
