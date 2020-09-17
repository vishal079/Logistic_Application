import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResetClientPassword } from 'src/app/_models/client-master.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientMasterService {
  formResetPassword: ResetClientPassword;

  constructor(private http: HttpClient) { }

  readonly eventRootURL = environment.baseUrl;

  resetCompanyPassword(form: NgForm) {
    const formData: FormData = new FormData();
    formData.append('client_id', form.value.client_id);
    formData.append('company_id', form.value.company_id);
    formData.append('new_password', form.value.Password);
    return this.http.post(this.eventRootURL + '/api/client/reset/company', formData);
  }
}
