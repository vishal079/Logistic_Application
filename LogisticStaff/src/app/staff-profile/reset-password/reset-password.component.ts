import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StaffProfileService } from 'src/app/_services/staff-profile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  constructor(public staffProfileService: StaffProfileService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.staffProfileService.formEvent = {
      id: localStorage.getItem('staff_id'),
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  onSubmit(form: NgForm) {
    this.staffProfileService.postStaffResetPassword().subscribe(
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
