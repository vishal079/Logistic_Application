import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListClientJobComponent } from './client-job/list-client-job/list-client-job.component';
import { ClientContactComponent } from './client-contact/client-contact.component';
import { ListClientContactComponent } from './client-contact/list-client-contact.component';
import { ListClientAddressComponent } from './client-address/list-client-address.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { ResetPasswordComponent } from './client-profile/reset-password/reset-password.component';
import { AuthGuard } from './_guard/auth.guard';
import { ListClientDeliveryAddressComponent } from './client-address/client-delivery-address/list-client-delivery-address.component';
import { ReportJobComponent } from './report-job/report-job.component';


const routes: Routes = [
  { path: '', redirectTo: "/clientLogin", pathMatch: 'full' },
  { path: 'LogisticClient/', redirectTo: "/clientLogin", pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'ListClientJobs', component: ListClientJobComponent, canActivate: [AuthGuard] },
  { path: 'ManageClientContact', component: ListClientContactComponent, canActivate: [AuthGuard] },
  { path: 'ManageClientAddress', component: ListClientAddressComponent, canActivate: [AuthGuard] },
  { path: 'ManageClientDeliveryAddress', component: ListClientDeliveryAddressComponent, canActivate: [AuthGuard] },
  { path: 'ClientProfile', component: ClientProfileComponent, canActivate: [AuthGuard] },
  { path: 'ResetPassword', component: ResetPasswordComponent, canActivate: [AuthGuard] },
  { path: 'JobReport', component: ReportJobComponent, canActivate: [AuthGuard] },
  {
    path: 'clientLogin',
    loadChildren: './client-login/client-login.module#ClientLoginModule',
    data: { showHeader: false, showSidebar: false }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
