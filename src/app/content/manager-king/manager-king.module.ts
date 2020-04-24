import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagerKingRoutingModule} from "./manager-king-routing.module";
import { ManageShopsInfoComponent } from './manage-shops-info/manage-shops-info.component';
import { ManagementDashboardComponent } from './management-dashboard/management-dashboard.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from '../../app.component';

@NgModule({
  declarations: [ManageShopsInfoComponent,
    ManagementDashboardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ManagerKingRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class ManagerKingModule { }
