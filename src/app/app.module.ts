import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarehouseQueenComponent } from './content/warehouse-queen/warehouse-queen.component';
import { StockInWarehouseComponent } from './content/warehouse-queen/stock-in-warehouse/stock-in-warehouse.component';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewDeliveryOrderComponent } from './content/warehouse-queen/new-delivery-order/new-delivery-order.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseQueenComponent,
    StockInWarehouseComponent,
    NewDeliveryOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CdkTableModule,
    MatTableModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
