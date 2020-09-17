import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public service: AuthenticationService, public appComponant : AppComponent) { }

  ngOnInit() {
    if (localStorage.getItem('companyUsername') != null)
      this.service.loggedInUser = localStorage.getItem('companyUsername');
  }

  onLogout() {
    localStorage.removeItem('companyToken');
    localStorage.removeItem('companyUsername');
    console.log('before logout navigate');
    this.router.navigate(['companyLogin']);
    //this.router.navigateByUrl('');
    console.log('after logout navigate');
  }
}
