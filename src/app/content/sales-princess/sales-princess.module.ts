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


@NgModule({
  declarations: [NewDeliveryFromWarehouseComponent, NewDeliveryFromWarehouseDetailsComponent],
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
    MatButtonModule
  ],
  entryComponents: [
    NewDeliveryFromWarehouseDetailsComponent
  ]
})
export class SalesPrincessModule {
}
