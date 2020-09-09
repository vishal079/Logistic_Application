import { Component, OnInit } from '@angular/core';
import { VehicleMasterService } from 'src/app/_services/vehicle-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-vehicle-master',
  templateUrl: './vehicle-master.component.html',
  styles: []
})
export class VehicleMasterComponent implements OnInit {

  constructor(public vehicleService: VehicleMasterService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  _vehicleStartTime: NgbTimeStruct = { hour: new Date().getHours(), minute: new Date().getMinutes(), second: new Date().getSeconds() };
  _vehicleEndTime: NgbTimeStruct = { hour: new Date().getHours(), minute: new Date().getMinutes(), second: new Date().getSeconds() };

  ngOnInit() {
    this.resetForm();
    this.vehicleService.bindVehicleType();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.vehicleService.formVehicle = {
      Id: 0,
      number: "",
      type: "",
      available_end_time: "",
      available_start_time: ""
    };
    //this._eventDateTime = new Date();
  }

  onSubmit(form: NgForm) {
    console.log(this.vehicleService.formVehicle.Id);
    if (this.vehicleService.formVehicle.Id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    //debugger;
    if (this._vehicleStartTime)
      this.vehicleService.formVehicle.available_start_time = this._vehicleStartTime.hour + ":" + this._vehicleStartTime.minute;
    if (this._vehicleEndTime)
      this.vehicleService.formVehicle.available_end_time = this._vehicleEndTime.hour + ":" + this._vehicleEndTime.minute;

    //console.log(this.vehicleService.formVehicle.available_start_time);
    //console.log(this.vehicleService.formVehicle.available_end_time);
    this.spinner.show();
    this.vehicleService.postClientDetail().subscribe(
      (res: any) => {
        //debugger;
        console.log(res);
        if (res.message == 'Vehicle inserted successfully') {
          this.resetForm(form);
          this.toastr.success("Submitted Successfully", "Vehicle Added Successfully!");
          this.vehicleService.refreshList();
        }
        else {
          this.toastr.error("", res.message);
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }

  updateRecord(form: NgForm) {
    this.vehicleService.putClientDetail().subscribe(
      (res: any) => {
        debugger;
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", "Vehicle Updated Successfully!");
          this.vehicleService.refreshList();
        }
        else {
          this.toastr.success("", res.message);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}