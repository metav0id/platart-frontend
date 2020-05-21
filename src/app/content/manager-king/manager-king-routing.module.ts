import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerShopsInfoComponent} from './manager-shops-info/manager-shops-info.component';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';
import {AuthGuard} from '../guards/auth.guard';
import {ManagerGuard} from '../guards/manager.guard';

const routes: Routes = [
  {path: 'manageshopsinfo', component: ManagerShopsInfoComponent, canActivate: [AuthGuard, ManagerGuard]},
  {path: 'managerdashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard, ManagerGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule { }
