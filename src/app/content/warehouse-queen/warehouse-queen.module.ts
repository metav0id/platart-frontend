import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseQueenRoutingModule } from './warehouse-queen-routing.module';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewDeliveryToShopComponent} from './new-delivery-to-shop/new-delivery-to-shop.component';
import { NewDeliveryToWarehouseComponent } from './new-delivery-to-warehouse/new-delivery-to-warehouse.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    StockInWarehouseComponent,
    NewDeliveryToShopComponent,
    NewDeliveryToWarehouseComponent
  ],
    imports: [
        CommonModule,
        WarehouseQueenRoutingModule,
        CdkTableModule,
        MatTableModule,
        BrowserAnimationsModule,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class WarehouseQueenModule { }
