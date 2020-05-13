import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManagerShopsInfoComponent} from './manager-shops-info/manager-shops-info.component';
import {ManagerDashboardComponent} from './manager-dashboard/manager-dashboard.component';

const routes: Routes = [
  {path: 'manageshopsinfo', component: ManagerShopsInfoComponent},
  {path: 'managerdashboard', component: ManagerDashboardComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule { }
