import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewDeliveryFromWarehouseComponent } from './new-delivery-from-warehouse/new-delivery-from-warehouse.component';
import {SalesPrincessRoutingModule} from "./sales-princess-routing.module";
import { CheckoutSoldItemsComponent } from './checkout-sold-items/checkout-sold-items.component';
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {CdkTableModule} from "@angular/cdk/table";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";



@NgModule({
  declarations: [NewDeliveryFromWarehouseComponent, CheckoutSoldItemsComponent],
  imports: [
    CommonModule,
    SalesPrincessRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ]
})
export class SalesPrincessModule { }
