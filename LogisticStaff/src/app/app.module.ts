import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AuthenticationService } from './_services/authentication.service';
import { AuthInterceptor } from './_guard/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from './component/layout.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSignaturepadModule } from 'ngx-signaturepad2';
import { SignatureComponent } from './signature/signature.component';
import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { ResetPasswordComponent } from './staff-profile/reset-password/reset-password.component';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { StaffReportComponent } from './staff-report/staff-report.component';
import { PickupJobComponent } from './pickup-job/pickup-job.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPrintModule } from 'ngx-print';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignatureComponent,
    ImageUploadTestComponent,
    StaffProfileComponent,
    ResetPasswordComponent,
    ManageJobComponent,
    StaffReportComponent,
    PickupJobComponent,
    NotificationComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    HttpClientModule,
    //RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSignaturepadModule,
    LoginModule,
    ChartsModule,
    LayoutModule,
    NgbModule,
    ToastrModule.forRoot(),
    NgxPrintModule,
    CollapseModule.forRoot() // ToastrModule added
  ],
  providers: [AuthenticationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
