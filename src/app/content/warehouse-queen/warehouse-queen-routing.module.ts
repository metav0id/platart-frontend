import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockInWarehouseComponent} from './stock-in-warehouse/stock-in-warehouse.component';


const routes: Routes = [
  {path: 'stockinwarehouse', component: StockInWarehouseComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseQueenRoutingModule { }
