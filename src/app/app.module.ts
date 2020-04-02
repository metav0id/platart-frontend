import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarehouseQueenComponent } from './content/warehouse-queen/warehouse-queen.component';
import { StockInWarehouseComponent } from './content/warehouse-queen/stock-in-warehouse/stock-in-warehouse.component';
import {HttpClientModule} from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    WarehouseQueenComponent,
    StockInWarehouseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CdkTableModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
