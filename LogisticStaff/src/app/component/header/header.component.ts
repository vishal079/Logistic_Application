import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public service: AuthenticationService, public notificationService: NotificationService,
    public appComponant: AppComponent, private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('StaffUsername') != null) {
      this.service.loggedInUser = localStorage.getItem('StaffUsername');
      this.notificationService.bindNotification();
      interval(30000)
        .subscribe((val) => {
          this.notificationService.bindNotification();
        });
    }
    else {
      localStorage.removeItem('token');
      this.router.navigateByUrl('login');
    }
  }

  readNotification(notificationstaffId, notificationId) {
    this.notificationService.readNotification(notificationstaffId, notificationId).subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.notificationService.bindNotification();
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

  onLogout() {
    localStorage.removeItem('StaffToken');
    localStorage.removeItem('StaffUsername');
    console.log('before logout navigate');
    this.router.navigate(['login']);
    //this.router.navigateByUrl('');
    console.log('after logout navigate');
  }

  ViewProfile_Click() { }
}
