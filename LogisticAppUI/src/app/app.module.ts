import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { LayoutModule } from './component/layout.module';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientMasterComponent } from './clients/client-master/client-master.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { ClientSubCompanyComponent } from './clients/client-sub-company/client-sub-company.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { AuthenticationService } from './_services/authentication.service';
import { AuthInterceptor } from './_guard/auth.interceptor';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { StaffMasterComponent } from './staff/staff-master/staff-master.component';
import { VehicleMasterComponent } from './vehicle/vehicle-master/vehicle-master.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ClientSubCompanyListComponent } from './clients/client-sub-company-list/client-sub-company-list.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AssignJobComponent } from './assign-job/assign-job.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';//not in use
// import { DatepickerModule } from 'ngx-bootstrap/datepicker';
// import { TimepickerModule } from 'ngx-bootstrap/timepicker';
// import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { ChartsModule } from 'ng2-charts';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { ResetClientPasswordComponent } from './reset-client-password/reset-client-password.component';
import { ManageJobComponent } from './assign-job/manage-job/manage-job.component';
import { NgxPrintModule } from 'ngx-print';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NotificationComponent } from './notification/notification.component';
import { ReportJobComponent } from './report-job/report-job.component';
import { ClientContactComponent } from './clients/client-contact/client-contact.component';
import { ListClientContactComponent } from './clients/client-contact/list-client-contact.component';
import { ReportClientComponent } from './report-client/report-client.component';
import { ReportStaffComponent } from './report-staff/report-staff.component';
import { ReportVehicleComponent } from './report-vehicle/report-vehicle.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { ResetPasswordComponent } from './admin-profile/reset-password.component'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientListComponent,
    ClientMasterComponent,
    ClientSubCompanyComponent,
    LandingComponent,
    StaffListComponent,
    StaffMasterComponent,
    VehicleMasterComponent,
    VehicleListComponent,
    ClientSubCompanyListComponent,
    AssignJobComponent,
    ResetClientPasswordComponent,
    ManageJobComponent,
    NotificationComponent,
    ReportJobComponent,
    ClientContactComponent,
    ListClientContactComponent,
    ReportClientComponent,
    ReportStaffComponent,
    ReportVehicleComponent,
    AdminProfileComponent,
    ResetPasswordComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    ShowHidePasswordModule,
    HttpClientModule,
    ChartsModule,
    //RouterModule.forRoot([]),
    //RouterModule.forRoot(routes, { useHash: true }),  // .../#/crisis-center/
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LoginModule,
    //ClientLoginModule,
    LayoutModule,
    NgbModule,
    DlDateTimePickerDateModule,
    ToastrModule.forRoot(), // ToastrModule added
    // DatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    DatetimePopupModule.forRoot(),
    NgxPrintModule,
    CollapseModule.forRoot()
  ],
  providers: [NgxSpinnerModule, AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
