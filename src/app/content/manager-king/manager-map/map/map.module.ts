import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WarehouseQueenRoutingModule} from "../../../warehouse-queen/warehouse-queen-routing.module";
import {CdkTableModule} from "@angular/cdk/table";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    // MarkerFormComponent
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
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
  ]
})
export class MapModule {
}
