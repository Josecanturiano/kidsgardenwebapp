import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../login/services/auth-service.service';

import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this.auth.getCurrentUser();
    if (currentUser) {
      // logged in so return true
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  // canLoad(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.checkLogin(route);
  // }

  // checkLogin(s?: ActivatedRouteSnapshot): boolean {
  //   const currentUser = this.auth.getCurrentUser();
  //   if (currentUser) {
  //     // logged in so return true
  //     return true;
  //   }
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: s.url } });
  //   return false;
  // }

}
