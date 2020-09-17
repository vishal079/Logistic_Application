import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientMasterService } from '../_services/client-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-company-password',
  templateUrl: './reset-company-password.component.html',
  styles: []
})
export class ResetCompanyPasswordComponent implements OnInit {
  @Input() companyId = '';
  @Input() clientId = '';
  validationMessage: string = "";
  constructor(private clientService: ClientMasterService, private toastr: ToastrService) { }
  resetForm: NgForm;
  ngOnInit() {
    if (this.resetForm != null)
      this.resetForm.resetForm();
    this.validationMessage = "";
  }

  onSubmit(form: NgForm) {
    //console.log(form.value);
    if (form.value.Password === form.value.Confirm_Password) {
      this.validationMessage = "";
      this.clientService.resetCompanyPassword(form).subscribe(
        (res: any) => {
          console.log(res);
          debugger;
          if (res.status) {
            form.resetForm();
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
    else {
      this.validationMessage = "Password and confirm password does not match."
    }
  }
}
