import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './content/page-not-found/page-not-found.component';
import { MapComponent } from './content/map/map.component';
import {HomeComponent} from "./content/pages/home/home.component";
import {RegistroComponent} from "./content/pages/registro/registro.component";
import {LoginComponent} from "./content/pages/login/login.component";


const routes: Routes = [
  //{path: '', redirectTo: 'warehouse', pathMatch: 'full'},
  {path: 'pendiente', component: MapComponent},
  { path: 'home'    , component: MapComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'registro' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
