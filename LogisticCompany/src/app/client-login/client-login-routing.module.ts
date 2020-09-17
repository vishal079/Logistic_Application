import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientLoginComponent } from './client-login.component';

const routes: Routes = [{ path: '', component: ClientLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientLoginRoutingModule { }
