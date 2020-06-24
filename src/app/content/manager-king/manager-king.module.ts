import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagerKingRoutingModule} from './manager-king-routing.module';
import {ManagerShopsInfoComponent} from './manager-inventory-display/manager-shops-info/manager-shops-info.component';
import {ManagerDashboardComponent} from './manager-dashboards/dashboard-overview/manager-dashboard.component';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {ArchGaugeCardComponent} from './manager-dashboards/widgets/arch-gauge-card/arch-gauge-card.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {ManagerInventoryDisplayComponent} from './manager-inventory-display/manager-inventory-display.component';
import {ManagerWarehouseInfoComponent} from './manager-inventory-display/manager-warehouse-info/manager-warehouse-info.component';
import {RegisterComponent} from './register/register.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {TranslocoRootModule} from '../../transloco-root.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SalesDescriptionComponent} from '../sales-princess/sales-description/sales-description.component';
// tslint:disable-next-line:max-line-length
import {ManagerWarehouseCheckinDescriptionComponent} from '../warehouse-queen/manager-warehouse-checkin-description/manager-warehouse-checkin-description.component';
import {ComerceFormComponent} from './manager-map/comerce-form/comerce-form.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ManagerDashboardCategoryComponent} from './manager-dashboards/category-overview/manager-dashboard-category.component';
import {ShopPerformanceCardComponent} from './manager-dashboards/widgets/shop-performance-chart-card/shop-performance-card.component';
import {WeeklyPerformanceCardComponent} from './manager-dashboards/widgets/weekly-performance-chart-card/weekly-performance-card.component';

@NgModule({
  declarations: [
    ManagerDashboardComponent,
    ArchGaugeCardComponent,
    ShopPerformanceCardComponent,
    WeeklyPerformanceCardComponent,
    ManagerInventoryDisplayComponent,
    ManagerShopsInfoComponent,
    ManagerWarehouseInfoComponent,
    RegisterComponent,
    SalesDescriptionComponent,
    ManagerWarehouseCheckinDescriptionComponent,
    ComerceFormComponent,
    ManagerDashboardCategoryComponent
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
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    TranslocoRootModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTooltipModule,
  ]
})
export class ManagerKingModule {
}
