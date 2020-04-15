import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerKingRoutingModule} from "./manager-king-routing.module";
import { ManageShopsInfoComponent } from './manage-shops-info/manage-shops-info.component';



@NgModule({
  declarations: [ManageShopsInfoComponent],
  imports: [
    CommonModule,
    ManagerKingRoutingModule
  ]
})
export class ManagerKingModule { }
