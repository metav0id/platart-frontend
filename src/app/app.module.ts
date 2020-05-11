import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
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
import {NewItemCategoryComponent} from './content/warehouse-queen/new-item-category/new-item-category.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MapComponent} from './content/map/map.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {AgmCoreModule} from '@agm/core';
import {SalesPrincessModule} from './content/sales-princess/sales-princess.module';
import {ManagerKingModule} from './content/manager-king/manager-king.module';
import {MatDialogModule} from '@angular/material/dialog';
import { TranslocoRootModule } from './transloco-root.module';
import {ComerceComponent} from './content/comerce/comerce.component';
import {FormComponent} from './content/comerce/form.component';
import { MarkerFormComponent } from './content/map/components/marker-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {UserComponent} from './content/pages/models/user.component';
import {RegistroComponent} from './content/pages/registro/registro.component';
import {LoginComponent} from './content/pages/login/login.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    NewItemCategoryComponent,
    MapComponent,
    ComerceComponent,
    FormComponent,
    MarkerFormComponent,
    UserComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WarehouseQueenModule,
    ManagerKingModule,
    SalesPrincessModule,
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
    MatDatepickerModule,
    MatSliderModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDNOu2JQ001PxZY-GVwFvVou0_6h_Sj-14'}),
    MatCardModule,
    MatDialogModule,
    TranslocoRootModule,
    MatFormFieldModule,
    MDBBootstrapModule.forRoot(),
    NgxChartsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
