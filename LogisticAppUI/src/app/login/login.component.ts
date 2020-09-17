import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  formModel = {
    UserName: '',
    Password: ''
  }
  constructor(private service: AuthenticationService, private router: Router,
    private toaster: ToastrService) { }

  ngOnInit() {
    console.log(localStorage.getItem('token'))
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['Dashboard'])
    }
    else {
      this.router.navigate(['login']);
    }
  }
  onSubmit(form: NgForm) {
    let formData: FormData = new FormData();
    formData.append('email', this.formModel.UserName);
    formData.append('password', this.formModel.Password);

    this.service.login(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          localStorage.setItem("token", res.token);
          localStorage.setItem('Username', res.Username);
          localStorage.setItem('adminEmail', res.data.email);
          localStorage.setItem('adminPhone', res.data.phone);
          localStorage.setItem('adminName', res.data.name);
          localStorage.setItem('admin_id', res.data.id);
          localStorage.setItem('is_super_admin', res.is_super_admin);
          this.router.navigateByUrl('Dashboard');
        }
        else {
          this.toaster.error("Authentication Failed", res.message);
        }
      },
      err => {
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
