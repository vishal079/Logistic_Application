import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  listNotification: any;
  listAllNotification: any;
  notificationCount: any;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindNotification(type) {
    let formData: FormData = new FormData();
    formData.append('notificationType', type);
    console.log(type);
    this.http.post(this.eventRootURL + '/api/admin/get_notification', formData).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.listNotification = res.data
          this.notificationCount = res.notificationCount;
        });
  }

  bindAllNotification(type) {
    let formData: FormData = new FormData();
    formData.append('notificationType', type);
    console.log(type);
    this.http.post(this.eventRootURL + '/api/admin/get_notification', formData).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.listAllNotification = res.data
          this.notificationCount = res.notificationCount;
        });
  }

  readNotification(notificationId) {
    let formData: FormData = new FormData();
    formData.append('notificationId', notificationId);
    return this.http.post(this.eventRootURL + '/api/admin/read_notification', formData);
  }
}
