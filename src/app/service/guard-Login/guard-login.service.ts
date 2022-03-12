import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardLoginService implements CanActivate{

  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.cookie.hasKey('token')) {
      return true;
    } else {
      this.router.navigate(['.'])
      return false;
    }
  }
}
