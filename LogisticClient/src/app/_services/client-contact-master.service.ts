import { Injectable } from '@angular/core';
import { clientContactMaster } from '../_models/client-contact-mster.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientContactMasterService {
  formEvent: clientContactMaster;
  listClientContacts: object;
  readonly eventRootURL = environment.baseUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  postContactDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/create/person', formData);
  }

  putClientDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/update/person', formData);
  }

  private CreateFormData() : FormData {
    let formData: FormData = new FormData();
    formData.append('person_id', this.formEvent.id.toString());
    formData.append('client_id', this.formEvent.client_id);
    formData.append('name', this.formEvent.name);
    formData.append('designation', this.formEvent.designation);
    formData.append('phone', this.formEvent.phone);
    formData.append('email', this.formEvent.email);
    return formData;
  }

  deleteContactDetail(id,personId) {
    let formData: FormData = new FormData();
    formData.append('client_id', id);
    formData.append('person_id', personId);
    return this.http.post(this.eventRootURL + '/api/client/delete/person', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/person', null).toPromise()
      .then((res: any) => {
        this.listClientContacts = res.data;
        this.spinner.hide();
      })
  }

  getAllClientContacts() {
    this.spinner.show();
    //debugger;
    this.http.post(this.eventRootURL + '/api/client/get/person', null).toPromise()
      .then((res: any) => {
        //debugger;
        this.listClientContacts = res.data;
        this.spinner.hide();
      })
  };

}
