import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { StaffMasterService } from 'src/app/_services/staff-master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styles: []
})
export class StaffListComponent implements OnInit {

  manage_staff_popup_name = "Add Staff Member";
  constructor(private http: HttpClient, public staffService: StaffMasterService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.staffService.getAllStaffMember()
  }
  inActiveStaff(event, staffId) {
    if (confirm("Are you sure you want to delete staff member?")) {
      this.spinner.show();
      this.staffService.deleteEventDetail(staffId).subscribe(
        (res: any) => {
          debugger;
          if (res.message == 'Staff deleted successfully') {
            this.toastr.success("", "Staff member removed successfully!");
            this.spinner.hide();
            this.staffService.refreshList();
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  bindStaff(event, objClient) {
    debugger;
    var vehicleDetails = { vehicle_id: objClient.vehicle_id, vehicle_name: objClient.number };
    this.staffService.bindVehicle(true, vehicleDetails)
    this.staffService.formStaff = {
      Id: objClient.id,
      name: objClient.name,
      email: objClient.email,
      phone: objClient.phone,
      password: "",//objClient.password
      vehicle_id: objClient.vehicle_id,
      vehicle_name: objClient.type
    };
    this.manage_staff_popup_name = "Edit Staff Member";
  }

  createStaff(e) {
    this.staffService.bindVehicle(false, null);
    this.staffService.formStaff = {
      Id: 0,
      name: "",
      email: "",
      phone: "",
      password: "",
      vehicle_id: "",
      vehicle_name: ""
    };
    this.manage_staff_popup_name = "Add Staff Member";
  }
}