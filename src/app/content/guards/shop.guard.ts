import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShopGuard implements CanActivate {
  private shopRole = 'Shop';

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.auth.isCorrectRole(this.shopRole)) {
      return true;
    } else {
      this.router.navigateByUrl('login');
    }
  }


}
