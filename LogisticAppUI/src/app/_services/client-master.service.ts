import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { clientMaster, ResetClientPassword } from 'src/app/_models/client-master.model';
//import { listAssembly } from '../shared/assembly.model';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ClientMasterService {
  formEvent: clientMaster;
  listClient: object;
  formResetPassword: ResetClientPassword;
  //listAssembly: listAssembly[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;
  readonly assemblyRootURL = environment.baseUrl + 'AssemblyMasters';

  bindAssembly() {
    // this.http.get(this.assemblyRootURL + '/GetAssemblyForDropdown').toPromise()
    //   .then(res => this.listAssembly = res as listAssembly[]);
  }
  private CreateFormData(): FormData {
    let formData: FormData = new FormData();
    //formData.append('Id', this.formEvent.Id.toString());
    formData.append('client_id', this.formEvent.Id.toString());
    formData.append('name', this.formEvent.name);
    formData.append('phone', this.formEvent.phone);
    formData.append('line1', this.formEvent.line1);
    formData.append('city', this.formEvent.city);
    formData.append('state', this.formEvent.state);
    formData.append('postal_code', this.formEvent.postal_code);
    formData.append('email', this.formEvent.email);
    formData.append('password', this.formEvent.password);
    return formData;
  }

  postClientDetail() {
    debugger;
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/add/client', formData);
  }

  putClientDetail() {
    debugger;
    let formData: FormData = this.CreateFormData();
    //formData.append('client_id', this.formEvent.Id.toString());
    return this.http.post(this.eventRootURL + '/api/edit/client', formData);
  }

  deleteEventDetail(id) {
    let formData: FormData = new FormData();
    formData.append('client_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/client', formData);
  }

  refreshList() {
    // this.http.get(this.eventRootURL + '/api/get/client').toPromise()
    //   .then(res => this.list = res as PaymentDetail[]);
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/client', null).toPromise()
      .then((res: any) => {
        this.listClient = res.data;
        this.spinner.hide();
      })
  }

  getAllClients() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/client', null).toPromise()
      .then((res: any) => {
        debugger;
        this.listClient = res.data;
        this.spinner.hide();
      })
  };

  resetClientPassword(form: NgForm) {
    //debugger;
    let formData: FormData = new FormData();
    formData.append('client_id', form.value.client_id);
    formData.append('new_password', form.value.Password);
    return this.http.post(this.eventRootURL + '/api/change/client_password', formData);
  }
}
