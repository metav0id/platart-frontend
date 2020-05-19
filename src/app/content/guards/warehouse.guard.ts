import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class WarehouseGuard implements CanActivate{
 role = localStorage.getItem('role');

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {

    if (this.auth.authStatus() && (this.role == "admin" || this.role == "warehouse")) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }


}
