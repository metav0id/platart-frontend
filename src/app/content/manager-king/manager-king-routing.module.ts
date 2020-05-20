import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManagerShopsInfoComponent} from './manager-inventory-display/manager-shops-info/manager-shops-info.component';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';
import {ManagerInventoryDisplayComponent} from './manager-inventory-display/manager-inventory-display.component';

const routes: Routes = [
  {path: 'managerinventoryinfo', component: ManagerInventoryDisplayComponent},
  {path: 'managerdashboard', component: ManagerDashboardComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule { }
