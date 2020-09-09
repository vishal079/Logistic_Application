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
    console.log(localStorage.getItem('StaffToken'))
    if (localStorage.getItem('StaffToken') != null && localStorage.getItem('StaffUsername') != null) {
      this.router.navigate(['Dashboard'])
    }
  }
  onSubmit(form: NgForm) {
    let formData: FormData = new FormData();
    formData.append('email', this.formModel.UserName);
    formData.append('password', this.formModel.Password);

    this.service.login(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message == "Login successfully.") {
          debugger;
          localStorage.setItem("StaffToken", res.token);
          localStorage.setItem('StaffUsername', res.Username);
          localStorage.setItem('staffName', res.data.name);
          localStorage.setItem('staffemail', res.data.email);
          localStorage.setItem('staffphone', res.data.phone);
          localStorage.setItem('staffVehicle', res.data.vehicle_id);
          localStorage.setItem("staff_id", res.data.id);
          this.router.navigateByUrl('Dashboard');
        }
        else {
          this.toaster.error("", res.message);
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
