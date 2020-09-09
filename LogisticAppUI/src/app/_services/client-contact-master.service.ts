import { Injectable } from '@angular/core';
import { clientContactMaster } from '../_models/client-contact-mster.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { listParentCompany } from '../_models/client-sub-company.module';

@Injectable({
  providedIn: 'root'
})
export class ClientContactMasterService {
  formEvent: clientContactMaster;
  listClientContacts: object;
  listParentCompany: listParentCompany[];
  selectedParentCompany: string;

  readonly eventRootURL = environment.baseUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  bindParentCompanys() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/client', null).toPromise()
      .then(
        (res: any) => {
          this.listParentCompany = res.data as listParentCompany[]
          if (res != null && res.data != null && res.data.length > 0 && res.data[0].id) {
            //debugger;
            this.selectedParentCompany = res.data[0].id
            this.getAllContacts(res.data[0].id);
          }
          else{
            this.selectedParentCompany = "0";
          }
          this.spinner.hide();
        });
  }

  getAllContacts(client_id) {
    this.spinner.show();
    debugger;
    let formData: FormData = new FormData();
    formData.append('client_id', client_id);
    this.http.post(this.eventRootURL + '/api/get/client_person', formData).toPromise()
      .then((res: any) => {
        this.selectedParentCompany = client_id;
        this.listClientContacts = res.data;
        this.spinner.hide();
      })
  }

  postContactDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/create/client_person', formData);
  }

  putClientDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/update/client_person', formData);
  }

  private CreateFormData(): FormData {
    debugger;
    let formData: FormData = new FormData();
    formData.append('person_id', this.formEvent.id.toString());
    formData.append('client_id', this.formEvent.client_id);
    formData.append('name', this.formEvent.name);
    formData.append('designation', this.formEvent.designation);
    formData.append('phone', this.formEvent.phone);
    formData.append('email', this.formEvent.email);
    formData.append('client_id', this.selectedParentCompany);
    return formData;
  }

  deleteContactDetail(id, personId) {
    let formData: FormData = new FormData();
    formData.append('client_id', id);
    formData.append('person_id', personId);
    return this.http.post(this.eventRootURL + '/api/delete/client_person', formData);
  }

  refreshList() {
    let formData: FormData = new FormData();
    formData.append('client_id', this.selectedParentCompany);
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/client_person', formData).toPromise()
      .then((res: any) => {
        this.listClientContacts = res.data;
        this.spinner.hide();
      })
  }

  getAllClientContacts() {
    let formData: FormData = new FormData();
    formData.append('client_id', this.selectedParentCompany);
    this.spinner.show();
    //debugger;
    this.http.post(this.eventRootURL + '/api/get/client_person', formData).toPromise()
      .then((res: any) => {
        //debugger;
        this.listClientContacts = res.data;
        this.spinner.hide();
      })
  };

}
