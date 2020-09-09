import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignatureComponent } from './signature/signature.component';
import { ImageUploadTestComponent } from './image-upload-test/image-upload-test.component';
import { StaffProfileComponent } from './staff-profile/staff-profile.component';
import { AuthGuard } from './_guard/auth.guard';
import { ManageJobComponent } from './manage-job/manage-job.component';
import { StaffReportComponent } from './staff-report/staff-report.component';
import { NotificationComponent } from './notification/notification.component';



const routes: Routes = [
  { path: '', redirectTo: "/login", pathMatch: 'full' },
  //{ path: '', redirectTo: "/clientLogin", pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Signature', component: SignatureComponent, canActivate: [AuthGuard] },
  { path: 'ImageUpload', component: ImageUploadTestComponent, canActivate: [AuthGuard] },
  { path: 'Profile', component: StaffProfileComponent, canActivate: [AuthGuard] },
  { path: 'ManageJob', component: ManageJobComponent, canActivate: [AuthGuard] },
  { path: 'StaffReport', component: StaffReportComponent, canActivate: [AuthGuard] },
  { path: 'AppNotification', component: NotificationComponent, canActivate: [AuthGuard] },
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