import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';
import {ManagerInventoryDisplayComponent} from './manager-inventory-display/manager-inventory-display.component';
import {AuthGuard} from '../guards/auth.guard';
import {ManagerGuard} from '../guards/manager.guard';

const routes: Routes = [
  {path: 'managerinventoryinfo', component: ManagerInventoryDisplayComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'managerdashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard, ManagerGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule { }
