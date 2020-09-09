import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { StaffResetPasswordModule } from '../_models/staff-profile/staff-profile.module';

@Injectable({
  providedIn: 'root'
})
export class StaffProfileService {

  readonly eventRootURL = environment.baseUrl;
  formEvent: StaffResetPasswordModule;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  postStaffResetPassword() {
    debugger
    let formData: FormData = new FormData();
    formData.append('staff_id', this.formEvent.id);
    formData.append('old_password', this.formEvent.old_password);
    formData.append('new_password', this.formEvent.new_password);
    return this.http.post(this.eventRootURL + '/api/staff/reset_password', formData);
  }
}
