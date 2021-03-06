import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class DashboardMasterService {
  totalAssigned: string;
  totalPicked: string;
  totalPartiallyDelivered: string;
  totalDelivered: string;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindDashboard(startDate, endDate) {
    this.spinner.show();
    var formData = new FormData();
    formData.append('staff_id', localStorage.getItem('staff_id'))
    if (startDate != null) {
      formData.append('start_date', startDate);
    }
    if (endDate != null) {
      formData.append('end_date', endDate);
    }
    return this.http.post(this.eventRootURL + '/api/staff/dashboard', formData).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.totalAssigned = res.data.totalAssigned;
          this.totalPicked = res.data.totalPicked;
          this.totalPartiallyDelivered = res.data.totalPartiallyDelivered;
          this.totalDelivered = res.data.totalDelivered;
          this.spinner.hide();
        });
  }


  bindDashboardNew(startDate, endDate) {
    this.spinner.show();
    debugger;
    var formData = new FormData();
    formData.append('staff_id', localStorage.getItem('staff_id'))
    if (startDate != null) {
      formData.append('start_date', startDate);
    }
    if (endDate != null) {
      formData.append('end_date', endDate);
    }
    return this.http.post(this.eventRootURL + '/api/staff/dashboard', formData);
  }
}
