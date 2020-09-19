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
    // debugger;
    this.spinner.show();
    const formData: FormData = new FormData();
    if (status != null && status != '') {
      formData.append('status', status);
    }
    if (deliveryDate != null && deliveryDate != '') {
      formData.append('deliveryDate', deliveryDate);
    }
    this.http.post(this.eventRootURL + '/api/staff/get/job', formData).toPromise()
      .then((res: any) => {

        if (res.data != null && res.data.length > 0) {
          for (let index = 0; index < res.data.length; index++) {

            const currentJob = res.data[index];
            let deliveredItems = 0;
            let rescheduledItems = 0;
            let cancelledItems = 0;
            for (let locationIndex = 0; locationIndex < res.data[index].deliveryLocation.length; locationIndex++) {
              res.data[index].deliveryLocation[locationIndex].isSelected = false;
              const deliveryLocationDetails = res.data[index].deliveryLocation[locationIndex];

              if (deliveryLocationDetails.delivery_status === '2') {
                deliveredItems++;
              }
              if (deliveryLocationDetails.delivery_status === '3') {
                rescheduledItems++;
              }
              if (deliveryLocationDetails.delivery_status === '4') {
                cancelledItems++;
                console.log('cancelledItems:', cancelledItems);
              }
            }

            res.data[index].jobStatusDetails = {};
            res.data[index].jobStatusDetails = { deliveredItems, rescheduledItems, cancelledItems };
          }
          this.listClientJob = res.data;
          console.log('this.listClientJob 55', this.listClientJob);
        } else {
          this.listClientJob = [];
        }
        this.spinner.hide();
      });
  }

  bindDashboard() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/staff/get/job', null).toPromise()
      .then((res: any) => {
        if (res.data != null && res.data.length > 0) {
          for (let index = 0; index < res.data.length; index++) {

            const currentJob = res.data[index];
            console.log('currentJob ', currentJob);
            let deliveredItems = 0;
            let rescheduledItems = 0;
            let cancelledItems = 0;
            for (let locationIndex = 0; locationIndex < res.data[index].deliveryLocation.length; locationIndex++) {
              res.data[index].deliveryLocation[locationIndex].isSelected = false;
              const deliveryLocationDetails = res.data[index].deliveryLocation[locationIndex];

              console.log('deliveryLocationDetails: ', deliveryLocationDetails);
              if (deliveryLocationDetails.delivery_status === '2') {
                deliveredItems++;
              } else if (deliveryLocationDetails.delivery_status === '3') {
                rescheduledItems++;
              } else if (deliveryLocationDetails.delivery_status === '4') {
                cancelledItems++;
                console.log('cancelledItems:', cancelledItems);
              }
            }

            res.data[index].jobStatusDetails = {};
            res.data[index].jobStatusDetails = { deliveredItems, rescheduledItems, cancelledItems };
            console.log('res.data[index].jobStatusDetails: ', res.data[index].jobStatusDetails);
          }
          this.listClientJob = res.data;
          console.log('this.listClientJob1', this.listClientJob);
        } else {
          this.listClientJob = [];
        }
        this.spinner.hide();
      });
  }

  updateStatus(objJob, acceptStatus) {
    const formData: FormData = new FormData();
    formData.append('job_id', objJob.id);
    formData.append('staff_id', objJob.staff_id);
    formData.append('is_accept', acceptStatus);
    return this.http.post(this.eventRootURL + '/api/staff/accept_job', formData);
  }
}
