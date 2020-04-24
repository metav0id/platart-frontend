import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WarehouseQueenRoutingModule} from "../warehouse-queen/warehouse-queen-routing.module";
import {CdkTableModule} from "@angular/cdk/table";
import {MatTableModule} from "@angular/material/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {
  MatFormFieldModule
} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";



@NgModule({
  declarations: [],
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
  ]
})
export class MapModule { }
