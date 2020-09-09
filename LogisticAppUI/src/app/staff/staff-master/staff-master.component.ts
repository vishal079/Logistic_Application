import { Component, OnInit } from '@angular/core';
import { StaffMasterService } from 'src/app/_services/staff-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-staff-master',
  templateUrl: './staff-master.component.html',
  styles: []
})
export class StaffMasterComponent implements OnInit {

  constructor(public staffService: StaffMasterService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.resetForm();
    this.staffService.bindVehicle(false, null);
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.staffService.formStaff = {
      Id: 0,
      name: "",
      email: "",
      phone: "",
      password: "",
      vehicle_id: "",
      vehicle_name: ""
    };
    //this._eventDateTime = new Date();
  }

  onSubmit(form: NgForm) {
    console.log(this.staffService.formStaff.Id);
    if (this.staffService.formStaff.Id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.spinner.show();
    this.staffService.postClientDetail().subscribe(
      (res: any) => {
        debugger;
        console.log(res);
        if (res.message == 'Staff inserted successfully') {
          this.resetForm(form);
          this.toastr.success("Submitted Successfully", "Staff member Created Successfully!");
          this.staffService.refreshList();
          this.staffService.bindVehicle(false, null);
        }
        else {
          this.toastr.error("", res.message);
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    this.spinner.show();
    this.staffService.putClientDetail().subscribe(
      (res: any) => {
        debugger;
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("Update Successfully", "Client Details Updated Successfully!");
          this.spinner.hide();
          this.staffService.refreshList();
        }
        else {
          this.toastr.error("", res.message);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}

