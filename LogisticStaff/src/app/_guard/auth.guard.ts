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
    //console.log(localStorage.getItem('token'))
    if (localStorage.getItem('StaffToken') != null) {
      return true;
    }
    else {
      this.router.navigate(['login']);
      //this.router.navigateByUrl('login');
      return false;
    }
  }

}
