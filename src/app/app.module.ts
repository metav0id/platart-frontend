import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarehouseQueenComponent } from './content/warehouse-queen/warehouse-queen.component';
import { StockInWarehouseComponent } from './content/warehouse-queen/stock-in-warehouse/stock-in-warehouse.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseQueenComponent,
    StockInWarehouseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
