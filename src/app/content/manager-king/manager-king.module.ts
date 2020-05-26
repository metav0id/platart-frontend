import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerKingRoutingModule} from './manager-king-routing.module';
import { ManagerShopsInfoComponent } from './manager-inventory-display/manager-shops-info/manager-shops-info.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { ArchGaugeCardComponent } from './manager-dashboard/widgets/arch-gauge-card/arch-gauge-card.component';
import { HbarCharCardComponent } from './manager-dashboard/widgets/hbar-char-card/hbar-char-card.component';
import { VbarChartCardComponent } from './manager-dashboard/widgets/vbar-chart-card/vbar-chart-card.component';
import { MonthToDateTableCardComponent } from './manager-dashboard/widgets/month-to-date-table-card/month-to-date-table-card.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatRadioModule} from '@angular/material/radio';
import { ManagerInventoryDisplayComponent } from './manager-inventory-display/manager-inventory-display.component';
import { ManagerWarehouseInfoComponent } from './manager-inventory-display/manager-warehouse-info/manager-warehouse-info.component';
import {RegisterComponent} from './register/register.component';


import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslocoRootModule} from '../../transloco-root.module';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { ManagerSalesDescriptionComponent } from './manager-sales-description/manager-sales-description.component';

@NgModule({
  declarations: [
    ManagerShopsInfoComponent,
    ManagerDashboardComponent,
    ArchGaugeCardComponent,
    HbarCharCardComponent,
    VbarChartCardComponent,
    MonthToDateTableCardComponent,
    ManagerInventoryDisplayComponent,
    ManagerShopsInfoComponent,
    ManagerWarehouseInfoComponent,
    RegisterComponent,
    ManagerSalesDescriptionComponent,
  ],
  imports: [
    CommonModule,
    ManagerKingRoutingModule,
    FlexModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatIconModule,
    NgxGaugeModule,
    NgxChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    TranslocoRootModule,

    MatInputModule,
    MatSortModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
  ]
})
export class ManagerKingModule { }
