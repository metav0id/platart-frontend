import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';
import {ManagerInventoryDisplayComponent} from './manager-inventory-display/manager-inventory-display.component';
import {AuthGuard} from '../guards/auth.guard';
import {ManagerGuard} from '../guards/manager.guard';
import {RegisterComponent} from './register/register.component';
import {ManagerSalesDescriptionComponent} from './manager-sales-description/manager-sales-description.component';
import {ManagerWarehouseCheckinDescriptionComponent} from './manager-warehouse-checkin-description/manager-warehouse-checkin-description.component';

const routes: Routes = [
  {path: 'managerinventoryinfo', component: ManagerInventoryDisplayComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'managerdashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'managersalesdescription', component: ManagerSalesDescriptionComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'managerwarehousecheckindescription', component: ManagerWarehouseCheckinDescriptionComponent, canActivate: [AuthGuard, ManagerGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule {
}
