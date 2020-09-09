import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageJobService {
  listClientJob: object;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindAssignedJobs(status, deliveryDate) {
    //debugger;
    this.spinner.show();
    let formData: FormData = new FormData();
    if (status != null && status != "") {
      formData.append('status', status);
    }
    if (deliveryDate != null && deliveryDate != "") {
      formData.append('deliveryDate', deliveryDate);
    }
    this.http.post(this.eventRootURL + '/api/staff/get/job', formData).toPromise()
      .then((res: any) => {
        debugger;
        if (res.data != null && res.data.length > 0) {
          for (let index = 0; index < res.data.length; index++) {
            for (let locationIndex = 0; locationIndex < res.data[index].deliveryLocation.length; locationIndex++) {
              res.data[index].deliveryLocation[locationIndex].isSelected = false;
            }
          }
          this.listClientJob = res.data;
        }
        else {
          this.listClientJob = []
        }
        this.spinner.hide();
      })
  }

  bindDashboard() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/staff/get/job', null).toPromise()
      .then((res: any) => {
        this.listClientJob = res.data;
        this.spinner.hide();
      })
  }

  updateStatus(objJob, acceptStatus) {
    let formData: FormData = new FormData();
    formData.append('job_id', objJob.id);
    formData.append('staff_id', objJob.staff_id);
    formData.append('is_accept', acceptStatus);
    return this.http.post(this.eventRootURL + '/api/staff/accept_job', formData);
  }
}
