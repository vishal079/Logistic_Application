import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styles: []
})
export class ClientLoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  }

  // constructor(private service: AuthenticationService, private router: Router,
  constructor(private service: AuthenticationService, private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    console.log('client login init');
    console.log(localStorage.getItem('companyToken'))
    if (localStorage.getItem('companyToken') != null) {
      this.router.navigate(['ListCompanyJobs'])
    }
  }
  onSubmit(form: NgForm) {
    debugger;
    let formData: FormData = new FormData();
    formData.append('email', this.formModel.UserName);
    formData.append('password', this.formModel.Password);

    this.service.companyLogin(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem("companyToken", res.token);
          localStorage.setItem('companyUsername', res.Username);
          localStorage.setItem("company_id", res.data.id);
          localStorage.setItem('client_id', res.client_id);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("CompanyProfile", JSON.stringify(res.data));
          if (res.is_first_login === "0")
            this.router.navigateByUrl('ResetPassword');
          else
            this.router.navigateByUrl('Dashboard');
        }
        else {
          this.toaster.error("Authentication Failed", res.message);
        }
      },
      err => {
        debugger;
        if (err.status == 400) {
          this.toaster.error("Incorrect Username or Password", "Authentication Failed");
        }
        else {
          console.log(err);
        }
      }
    );
  }
}
