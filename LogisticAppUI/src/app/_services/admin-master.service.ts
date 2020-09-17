import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminMaster, ResetAdminPassword } from 'src/app/_models/admin-master.model';
// import { listAssembly } from '../shared/assembly.model';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminMasterService {
  formEvent: adminMaster;
  listAdmin: object;
  formResetPassword: ResetAdminPassword;
  // listAssembly: listAssembly[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  private CreateFormData(): FormData {
    const formData: FormData = new FormData();
    // formData.append('Id', this.formEvent.Id.toString());
    formData.append('admin_id', this.formEvent.Id.toString());
    formData.append('name', this.formEvent.name);
    formData.append('phone', this.formEvent.phone);
    formData.append('is_super_admin', this.formEvent.AdminType.toString());
    formData.append('email', this.formEvent.email);
    formData.append('password', this.formEvent.password);
    return formData;
  }

  postAdminDetail() {
    debugger;
    const formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/add/admin', formData);
  }

  putAdminDetail() {
    const formData: FormData = this.CreateFormData();
    // formData.append('admin_id', this.formEvent.Id.toString());
    return this.http.post(this.eventRootURL + '/api/edit/admin', formData);
  }

  deleteEventDetail(id) {
    const formData: FormData = new FormData();
    formData.append('admin_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/admin', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/admin', null).toPromise()
      .then((res: any) => {
        this.listAdmin = res.data;
        this.spinner.hide();
      });
  }

  getAllAdmins() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/admin', null).toPromise()
      .then((res: any) => {
        this.listAdmin = res.data;
        this.spinner.hide();
      }).catch((error => {
        console.log('error: ', error);
      }));
  }

  resetAdminPassword(form: NgForm) {
    const formData: FormData = new FormData();
    formData.append('admin_id', form.value.admin_id);
    formData.append('new_password', form.value.Password);
    return this.http.post(this.eventRootURL + '/api/change/admin_password', formData);
  }
}
