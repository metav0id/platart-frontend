import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagerKingComponent} from './content/manager-king/manager-king.component';
import {SalesPrincessComponent} from './content/sales-princess/sales-princess.component';
import {PageNotFoundComponent} from './content/page-not-found/page-not-found.component';
import { MapComponent } from './content/map/map.component';
const routes: Routes = [
  //{path: '', redirectTo: 'warehouse', pathMatch: 'full'},
  {path: 'manager', component: ManagerKingComponent},
  {path: 'sales', component: SalesPrincessComponent},
  {path: '**', component: MapComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
