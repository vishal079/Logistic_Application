import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientSubCompanyModule, listParentCompany } from '../_models/client-sub-company.module';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ClientSubCompanyMasterService {

  formClientSubCompany: ClientSubCompanyModule
  listSubCompany: object;
  listParentCompany: listParentCompany[];
  selectedParentCompany: string;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindParentCompanys() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/client', null).toPromise()
      .then(
        (res: any) => {
          this.listParentCompany = res.data as listParentCompany[]
          if (res != null && res.data != null && res.data.length > 0 && res.data[0].id) {
            //debugger;
            this.selectedParentCompany = res.data[0].id
            this.getAllSubCompany(res.data[0].id);
            this.spinner.hide();
          }
        });
  }

  postSubCompany() {
    /* debugger; */
    let formData: FormData = new FormData();
    formData.append('name', this.formClientSubCompany.name);
    formData.append('phone', this.formClientSubCompany.phone);
    formData.append('address', this.formClientSubCompany.address);
    formData.append('client_id', this.selectedParentCompany);
    formData.append('email', this.formClientSubCompany.email);
    formData.append('password', this.formClientSubCompany.password);
    return this.http.post(this.eventRootURL + '/api/add/client_company', formData);
  }

  putSubCompany() {
    return this.http.put(this.eventRootURL + '/api/edit/staff' + this.formClientSubCompany.id, this.formClientSubCompany);
  }

  deleteSubCompany(id) {
    let formData: FormData = new FormData();
    formData.append('client_company_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/client_company', formData);
  }

  refreshList() {
    this.spinner.show();
    let formData: FormData = new FormData();
    formData.append('client_id', this.selectedParentCompany);
    this.http.post(this.eventRootURL + '/api/get/client_company', formData).toPromise()
      .then((res: any) => {
        this.listSubCompany = res.data;
        this.spinner.hide();
      })
  }

  getAllSubCompany(client_id) {
    this.spinner.show();
    console.log('getAllSubCompany() ' + client_id);
    let formData: FormData = new FormData();
    formData.append('client_id', client_id);
    this.http.post(this.eventRootURL + '/api/get/client_company', formData).toPromise()
      .then((res: any) => {
        this.selectedParentCompany = client_id;
        this.listSubCompany = res.data
        this.spinner.hide();
      })
  };
}
