import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerKingRoutingModule} from './manager-king-routing.module';
import { ManageShopsInfoComponent } from './manage-shops-info/manage-shops-info.component';
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

@NgModule({
  declarations: [ManageShopsInfoComponent, ManagerDashboardComponent, ArchGaugeCardComponent, HbarCharCardComponent,
    VbarChartCardComponent, MonthToDateTableCardComponent],
    imports: [
        CommonModule,
        ManagerKingRoutingModule,
        FlexModule,
        MatCardModule,
        MatDividerModule,
        FlexLayoutModule,
        MatIconModule,
        NgxGaugeModule,
        NgxChartsModule
    ]
})
export class ManagerKingModule { }
