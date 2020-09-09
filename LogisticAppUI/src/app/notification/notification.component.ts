import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { NotificationService } from '../_services/notification.service';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { interval } from 'rxjs';

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

  readNotification(notificationId) {
    this.spinner.show();
    this.notificationService.notificationCount--;
    this.notificationService.readNotification(notificationId).subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          //this.notificationService.bindNotification();
          this.spinner.hide();
          this.router.navigateByUrl('AssignJobs');
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
