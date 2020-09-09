import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientMasterComponent } from './clients/client-master/client-master.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
//import { ClientSubCompanyComponent } from './clients/client-sub-company/client-sub-company.component';
import { LandingComponent } from './landing/landing.component';
import { StaffListComponent } from './staff/staff-list/staff-list.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { ClientSubCompanyListComponent } from './clients/client-sub-company-list/client-sub-company-list.component';
import { AuthGuard } from './_guard/auth.guard';
import { AssignJobComponent } from './assign-job/assign-job.component';
import { NotificationComponent } from './notification/notification.component';
import { ReportJobComponent } from './report-job/report-job.component';
import { ListClientContactComponent } from './clients/client-contact/list-client-contact.component';
import { ReportClientComponent } from './report-client/report-client.component';
import { ReportStaffComponent } from './report-staff/report-staff.component';
import { ReportVehicleComponent } from './report-vehicle/report-vehicle.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';



const routes: Routes = [
  { path: '', redirectTo: "/Logistic", pathMatch: 'full' },
  {
    path: 'Logistic', component: LandingComponent,
    data: { showHeader: false, showSidebar: false }
  },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'ManageClient', component: ClientMasterComponent, canActivate: [AuthGuard] },
  { path: 'ManageContact', component: ListClientContactComponent, canActivate: [AuthGuard] },
  { path: 'ManageSubCompany', component: ClientSubCompanyListComponent, canActivate: [AuthGuard] },
  { path: 'ViewClient', component: ClientListComponent, canActivate: [AuthGuard] },
  { path: 'ManageStaff', component: StaffListComponent, canActivate: [AuthGuard] },
  { path: 'ManageVehicle', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'AssignJobs', component: AssignJobComponent, canActivate: [AuthGuard] },
  { path: 'AppNotification', component: NotificationComponent, canActivate: [AuthGuard] },
  { path: 'ReportJob', component: ReportJobComponent, canActivate: [AuthGuard] },
  { path: 'ReportClient', component: ReportClientComponent, canActivate: [AuthGuard] },
  { path: 'ReportStaff', component: ReportStaffComponent, canActivate: [AuthGuard] },
  { path: 'ReportVehicle', component: ReportVehicleComponent, canActivate: [AuthGuard] },
  { path: 'AdminProfile', component: AdminProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    data: { showHeader: false, showSidebar: false }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
