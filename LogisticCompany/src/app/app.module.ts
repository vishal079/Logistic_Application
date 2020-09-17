import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AuthenticationService } from './_services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './_guard/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from './component/layout.module';
import { ClientLoginModule } from './client-login/client-login.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListClientJobComponent } from './client-job/list-client-job/list-client-job.component';
import { ClientJobMasterComponent } from './client-job/client-job-master/client-job-master.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ListClientContactComponent } from './client-contact/list-client-contact.component';
import { ClientAddressComponent } from './client-address/client-address.component';
import { ListClientAddressComponent } from './client-address/list-client-address.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ResetPasswordComponent } from './client-profile/reset-password/reset-password.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { NgxPrintModule } from 'ngx-print';
import { ChartsModule } from 'ng2-charts';
import { ListClientDeliveryAddressComponent } from './client-address/client-delivery-address/list-client-delivery-address.component';
import { ClientDeliveryAddressComponent } from './client-address/client-delivery-address/client-delivery-address.component';
import { ReportJobComponent } from './report-job/report-job.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ListClientJobComponent,
    ClientJobMasterComponent,
    ClientContactComponent,
    ListClientContactComponent,
    ClientAddressComponent,
    ListClientAddressComponent,
    ClientProfileComponent,
    ResetPasswordComponent,
    ListClientDeliveryAddressComponent,
    ClientDeliveryAddressComponent,
    ReportJobComponent,
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    //RouterModule.forRoot([]),
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ClientLoginModule,
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
