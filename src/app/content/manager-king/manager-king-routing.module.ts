import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ManageShopsInfoComponent} from "./manage-shops-info/manage-shops-info.component";

const routes: Routes = [
  {path:'manageshopsinfo', component: ManageShopsInfoComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManagerKingRoutingModule { }
