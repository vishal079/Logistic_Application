import { Component, OnInit } from '@angular/core';
import { StaffProfileModule } from '../_models/staff-profile/staff-profile.module';

@Component({
  selector: 'app-staff-profile',
  templateUrl: './staff-profile.component.html',
  styles: []
})
export class StaffProfileComponent implements OnInit {
  employeeDetails:StaffProfileModule;
  constructor() { }
  
  ngOnInit() {
    debugger;
    this.employeeDetails = new StaffProfileModule();
    this.employeeDetails.name = localStorage.getItem("staffName");
    this.employeeDetails.email = localStorage.getItem("staffemail");
    this.employeeDetails.contact = localStorage.getItem("staffphone");
    this.employeeDetails.vehicle = localStorage.getItem("staffVehicle");
  }

}
