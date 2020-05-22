import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { MapComponent } from './content/map/map.component';
import {LoginComponent} from './content/pages/login/login.component';
import {AuthGuard} from './content/guards/auth.guard';


const routes: Routes = [
  {path: 'pendiente', component: MapComponent},
  { path: 'home'    , component: MapComponent, canActivate: [AuthGuard]  },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
