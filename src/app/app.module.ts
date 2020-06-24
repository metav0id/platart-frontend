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
import {NewItemCategoryComponent} from './content/manager-king/new-item-category/new-item-category.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MapComponent} from './content/manager-king/manager-map/map/map.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {AgmCoreModule} from '@agm/core';
import {SalesPrincessModule} from './content/sales-princess/sales-princess.module';
import {ManagerKingModule} from './content/manager-king/manager-king.module';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslocoRootModule} from './transloco-root.module';
import {ComerceComponent} from './content/manager-king/manager-map/comerce/comerce.component';
import {FormComponent} from './content/manager-king/manager-map/comerce/form.component';
import {MarkerFormComponent} from './content/manager-king/manager-map/components/marker-form.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {LoginComponent} from './content/pages/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from 'src/environments/environment';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {LandingPageWarehouseComponent} from './content/landing-page/landing-page-warehouse.component';
import { LightboxModule } from 'ngx-lightbox';
import { ElementComponent } from './content/landing-page/element/element.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NewItemCategoryComponent,
    MapComponent,
    ComerceComponent,
    FormComponent,
    MarkerFormComponent,
    LoginComponent,
    LandingPageWarehouseComponent,
    ElementComponent

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
    FlexLayoutModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    MatTooltipModule,
    MatExpansionModule,
    LightboxModule

  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {
}
