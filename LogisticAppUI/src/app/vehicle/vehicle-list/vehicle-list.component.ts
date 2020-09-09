import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleMasterService } from 'src/app/_services/vehicle-master.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styles: []
})
export class VehicleListComponent implements OnInit {

  manage_vehicle_popup_name = "Add Vehicle";
  constructor(private http: HttpClient, public vehicleService: VehicleMasterService, private toastr: ToastrService
    , private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.vehicleService.getAllVehicle()
  }

  inActiveVehicle(event, VehicleId) {
    if (confirm("Are you sure you want to delete vehicle?")) {
      this.spinner.show();
      this.vehicleService.deleteVehicleDetail(VehicleId).subscribe(
        (res: any) => {
          console.log(res);
          if (res.status) {
            this.toastr.success("Submitted Successfully", res.message);
            this.spinner.hide();
            this.vehicleService.refreshList();
          }
          else {
            this.toastr.error("", res.message);
            this.spinner.hide();
          }
        },
        err => {
          console.log(err);
          this.spinner.hide();
        }
      )
    }
  }

  bindVehicle(event, objVehicle) {
    debugger;
    this.vehicleService.bindVehicleType();
    this.vehicleService.formVehicle = {
      Id: objVehicle.id,
      number: objVehicle.number,
      type: objVehicle.type_id,
      available_start_time: objVehicle.available_start_time,
      available_end_time: objVehicle.available_end_time,
    };
    this.manage_vehicle_popup_name = "Edit Vehicle";
    //document.getElementById("openModalButton").click();
  }

  createVehicle(e) {
    this.vehicleService.formVehicle = {
      Id: 0,
      number: "",
      type: "",
      available_start_time: "",
      available_end_time: "",
    };
    this.manage_vehicle_popup_name = "Add Vehicle";
  }
}
