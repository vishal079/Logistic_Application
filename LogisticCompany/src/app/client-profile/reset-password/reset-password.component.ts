import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientProfileService } from 'src/app/_services/client-profile.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  constructor(public clientProfileService: ClientProfileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientProfileService.formEvent = {
      id: localStorage.getItem('company_id'),
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  onSubmit(form: NgForm) {
    this.clientProfileService.postClientResetPassword().subscribe(
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
}
