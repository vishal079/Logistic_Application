import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ClientLoginComponent } from './client-login.component';
import { ClientLoginRoutingModule } from './client-login-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ClientLoginRoutingModule,
        FlexLayoutModule,
        FormsModule
    ],
    declarations: [ClientLoginComponent]
})
export class ClientLoginModule { }