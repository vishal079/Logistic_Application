import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//import { User } from '../_models';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public loggedInUser: string;

  readonly rootURL = environment.baseUrl;
  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('companyUsername')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  companyLogin(formData) {
    return this.http.post(this.rootURL + '/api/company/login', formData);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('companyUsername');
    localStorage.removeItem('companyToken');
    this.currentUserSubject.next(null);
  }
}
