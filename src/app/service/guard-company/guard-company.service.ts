import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardCompanyService implements CanActivate {

  constructor(
    private router: Router,
    private cookie: CookieService
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let role = this.cookie.get('role');
    if (role == "COMPANY") {
      return true;
    } else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
