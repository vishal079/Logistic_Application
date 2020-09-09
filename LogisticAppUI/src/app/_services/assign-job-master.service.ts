import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientJobModule } from '../_models/client-job.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AssignJobMasterService {
  listPendingJob: object;
  selectedParentCompany: string;
  formEvent: ClientJobModule;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private router: Router) { }

  readonly eventRootURL = environment.baseUrl;

  refreshList() {
    this.spinner.show();
    let formData: FormData = new FormData();
    formData.append('client_id', this.selectedParentCompany);
    this.http.post(this.eventRootURL + '/api/get/job', formData).toPromise()
      .then((res: any) => {
        //debugger;
        this.listPendingJob = res.data;
        this.spinner.hide();
      })
  }

  getAllJobs(client_id, status, deliveryDate) {
    debugger;
    this.spinner.show();
    let formData: FormData = new FormData();
    if (client_id != null && client_id != "")
      formData.append('client_id', client_id);
    if (status != null && status != -1) {
      formData.append('status', status);
    }
    if (deliveryDate != null && deliveryDate != "") {
      formData.append('deliveryDate', deliveryDate);
    }
    this.http.post(this.eventRootURL + '/api/get/job', formData).toPromise()
      .then((res: any) => {
        debugger;
        if (res.status) {
          this.selectedParentCompany = client_id;
          this.listPendingJob = res.data
        }
        else {
          if (res.message === "Token Invalid.") {
            localStorage.removeItem('token');
            this.router.navigateByUrl('login');
          }
        }
        this.spinner.hide();
      })
  };

  postJobAssignDetail(formData) {
    return this.http.post(this.eventRootURL + '/api/assign/job', formData);
  }

  putJobAssignDetail() {
    return this.http.post(this.eventRootURL + '/api/add/client', this.formEvent);
  }

  deleteEventDetail(id) {
    let formData: FormData = new FormData();
    formData.append('client_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/client', formData);
  }
}
