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
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    return this.auth.isLoggedIn();
  }

  // constructor(private auth: AuthService, private router: Router) {
  // }
  //
  // canActivate(): boolean {
  //   if (this.auth.authStatus()) {
  // this.auth.authStatus().subscribe( resp => {
  //if(resp)
  // return true;
  // else{
  // navigatebyurl(login)
// }
//   //
// }
  //     return true;
  //   } else {
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }


}
