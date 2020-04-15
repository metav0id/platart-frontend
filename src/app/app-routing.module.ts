import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './content/page-not-found/page-not-found.component';
import { MapComponent } from './content/map/map.component';
const routes: Routes = [
  //{path: '', redirectTo: 'warehouse', pathMatch: 'full'},
  {path: '**', component: MapComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
