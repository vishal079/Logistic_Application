import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminMasterService } from '../_services/admin-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-admin-password',
  templateUrl: './reset-admin-password.component.html',
  styles: []
})
export class ResetAdminPasswordComponent implements OnInit {
  @Input() adminId = '';
  validationMessage = '';
  constructor(private adminService: AdminMasterService, private toastr: ToastrService) { }
  resetForm: NgForm;
  ngOnInit() {
    if (this.resetForm != null) {
      this.resetForm.resetForm();
    }
    this.validationMessage = '';
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (form.value.Password === form.value.Confirm_Password) {
      this.validationMessage = '';
      this.adminService.resetAdminPassword(form).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status) {
            form.resetForm();
            this.toastr.success('', res.message);
          } else {
            this.toastr.error('', res.message);
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.validationMessage = 'Password and confirm password do not match.';
    }
  }
}
