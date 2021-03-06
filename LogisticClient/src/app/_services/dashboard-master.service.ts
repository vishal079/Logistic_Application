import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DashboardMasterService {

  totalWaiting: string;
  totalAssigned: string;
  totalPicked: string;
  totalPartiallyDelivered: string;
  totalDelivered: string;
  totalCancelled: string;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindDashboard(startDate, endDate) {
    this.spinner.show();
    var formData = new FormData();
    formData.append('client_id', localStorage.getItem('client_id'))
    if (startDate != null) {
      formData.append('start_date', startDate);
    }
    if (endDate != null) {
      formData.append('end_date', endDate);
    }
    return this.http.post(this.eventRootURL + '/api/client/dashboard', formData).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.totalWaiting = res.data.totalWaiting;
          this.totalAssigned = res.data.totalAssigned;
          this.totalPicked = res.data.totalPicked;
          this.totalPartiallyDelivered = res.data.totalPartiallyDelivered;
          this.totalDelivered = res.data.totalDelivered;
          this.totalCancelled = res.data.totalCancelled;
          this.spinner.hide();
        });
  }


  bindDashboardNew(startDate, endDate) {
    this.spinner.show();
    var formData = new FormData();
    formData.append('client_id', localStorage.getItem('client_id'))
    if (startDate != null) {
      formData.append('start_date', startDate);
    }
    if (endDate != null) {
      formData.append('end_date', endDate);
    }
    return this.http.post(this.eventRootURL + '/api/client/dashboard', formData);
  }
}
