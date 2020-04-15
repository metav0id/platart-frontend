import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {SalesPrincessComponent} from './content/sales-princess/sales-princess.component';
import {ManagerKingComponent} from './content/manager-king/manager-king.component';
import {PageNotFoundComponent} from './content/page-not-found/page-not-found.component';
import {WarehouseQueenModule} from './content/warehouse-queen/warehouse-queen.module';
import {CdkTableModule} from '@angular/cdk/table';
import {MatTableModule} from '@angular/material/table';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NewDeliveryToShopComponent} from './content/warehouse-queen/new-delivery-to-shop/new-delivery-to-shop.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './content/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {FooterComponent} from './content/footer/footer.component';
import { NewItemCategoryComponent } from './content/warehouse-queen/new-item-category/new-item-category.component';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [
    AppComponent,
    SalesPrincessComponent,
    ManagerKingComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    NewItemCategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WarehouseQueenModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
