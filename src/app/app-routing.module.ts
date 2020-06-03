import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MapComponent } from './content/manager-king/manager-map/map/map.component';
import {LoginComponent} from './content/pages/login/login.component';
import {AuthGuard} from './content/guards/auth.guard';
import {PageNotFoundComponent} from "./content/page-not-found/page-not-found.component";


const routes: Routes = [
  // { path: 'home'    , component: MapComponent, canActivate: [AuthGuard]  },
  { path: 'login'   , component: LoginComponent },
  { path: 'landingPage'   , component: PageNotFoundComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
