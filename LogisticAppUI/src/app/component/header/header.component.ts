import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Observable, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  sub: any;

  constructor(private router: Router, public service: AuthenticationService, public notificationService: NotificationService,
    public appComponant: AppComponent, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (localStorage.getItem('Username') != null) {
      this.service.loggedInUser = localStorage.getItem('Username');
      this.notificationService.bindNotification('header');
      this.sub = interval(30000)
        .subscribe((val) => {
          this.notificationService.bindNotification('header');
        });
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
          this.notificationService.bindNotification('header');
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

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    console.log('before logout navigate');
    this.router.navigate(['login']);
    //this.router.navigateByUrl('');
    console.log('after logout navigate');
  }

  lessthan(index, count) {
    return index <= count;
  }
}
