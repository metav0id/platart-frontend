import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './content/pages/login/login.component';
import {AuthGuard} from './content/guards/auth.guard';

import {LandingPageWarehouseComponent} from "./content/landing-page/landing-page-warehouse.component";


const routes: Routes = [
  { path: 'login'   , component: LoginComponent },
  { path: 'landingPage' , component: LandingPageWarehouseComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'landingPage' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
