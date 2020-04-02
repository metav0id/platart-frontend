import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarehouseQueenComponent } from './content/warehouse-queen/warehouse-queen.component';
import { StockInWarehouseComponent } from './content/warehouse-queen/stock-in-warehouse/stock-in-warehouse.component';
import {HttpClientModule} from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseQueenComponent,
    StockInWarehouseComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NoopAnimationsModule,
        CdkTableModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
