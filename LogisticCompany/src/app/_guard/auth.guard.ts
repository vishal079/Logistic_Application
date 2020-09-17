import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    // console.log(localStorage.getItem('token'))
    if (localStorage.getItem('companyToken') != null) {
      return true;
    } else {
      this.router.navigate(['companyLogin']);
      return false;
    }
  }

}
