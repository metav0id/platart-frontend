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
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {
    this.auth.authStatus().subscribe()
  }


  canActivate(): boolean{
    this.auth.authStatus().subscribe( resp => {
        if (this.auth.permission){
          return true;
        }
        else {
          this.router.navigateByUrl('/login');
        }

      })
        return this.auth.permission;
    }


  // constructor(private auth: AuthService, private router: Router) {
  // }
  //
  // canActivate(): boolean {
  //   if (this.auth.authStatus()) {
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }


}
