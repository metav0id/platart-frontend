import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerKingRoutingModule} from './manager-king-routing.module';
import { ManagerShopsInfoComponent } from './manager-shops-info/manager-shops-info.component';
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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {SalesPrincessRoutingModule} from "../sales-princess/sales-princess-routing.module";
import {CdkTableModule} from "@angular/cdk/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslocoRootModule} from "../../transloco-root.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    ManagerShopsInfoComponent,
    ManagerDashboardComponent,
    ArchGaugeCardComponent,
    HbarCharCardComponent,
    VbarChartCardComponent,
    MonthToDateTableCardComponent
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

  ]
})
export class ManagerKingModule { }
