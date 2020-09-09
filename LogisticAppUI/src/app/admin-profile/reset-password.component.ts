import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthenticationService, private toastr: ToastrService) { }

  formModel = {
    id: '',
    old_password: '',
    new_password: '',
    confirm_password: ''
  }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    debugger;
    if (form != null) {
      this.resetForm()
    }
    this.formModel = {
      id: localStorage.getItem('admin_id'),
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  onSubmit(form: NgForm) {
    if (this.formModel.confirm_password == this.formModel.new_password) {
      let formData: FormData = new FormData();
      formData.append('admin_id', this.formModel.id);
      formData.append('old_password', this.formModel.old_password);
      formData.append('new_password', this.formModel.new_password);
      this.authService.resetPassword(formData).subscribe(
        (res: any) => {
          console.log(res);
          debugger;
          if (res.status) {
            this.resetForm(form);
            this.toastr.success("", res.message);
          }
          else {
            this.toastr.error("", res.message);
          }
        },
        err => {
          console.log(err);
        }
      )
    }
    else{
      this.toastr.error("", "Password and confirm password not match!");
    }
  }
}
