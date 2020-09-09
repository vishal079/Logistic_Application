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
    console.log(localStorage.getItem('clientToken'))
    if (localStorage.getItem('clientToken') != null) {
      this.router.navigate(['ListClientJobs'])
    }
  }
  onSubmit(form: NgForm) {
    debugger;
    let formData: FormData = new FormData();
    formData.append('email', this.formModel.UserName);
    formData.append('password', this.formModel.Password);

    this.service.clientLogin(formData).subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          localStorage.setItem("clientToken", res.token);
          localStorage.setItem('clientUsername', res.Username);
          localStorage.setItem("client_id", res.client_id);
          localStorage.setItem("user_id", res.user_id);
          localStorage.setItem("ClientProfile", JSON.stringify(res.data));
          debugger;
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
