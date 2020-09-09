import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notification.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: []
})
export class NotificationComponent implements OnInit {

  constructor(private router: Router, public service: AuthenticationService, public notificationService: NotificationService,
    public appComponant: AppComponent, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    debugger;
    if (localStorage.getItem('Username') != null) {
      this.service.loggedInUser = localStorage.getItem('Username');
      this.notificationService.bindAllNotification('All');
    }
    else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }
  }

  readNotification(notificationstaffId, notificationId) {
    this.spinner.show();
    if (this.notificationService.notificationCount > 0)
      this.notificationService.notificationCount--;
    this.notificationService.readNotification(notificationstaffId, notificationId).subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.spinner.hide();
          this.router.navigateByUrl('ManageJob');
        }
        else {
          this.toastr.error("", res.message);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
