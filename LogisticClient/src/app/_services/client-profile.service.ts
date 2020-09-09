import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientResetPasswordModule } from '../_models/client-profile/client-profile.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {
  readonly eventRootURL = environment.baseUrl;
  formEvent: ClientResetPasswordModule;
  
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  postClientResetPassword() {
    let formData: FormData = new FormData();
    formData.append('client_id', this.formEvent.id);
    formData.append('old_password', this.formEvent.old_password);
    formData.append('new_password', this.formEvent.new_password);
    return this.http.post(this.eventRootURL + '/api/client/reset_password', formData);
  }

}
