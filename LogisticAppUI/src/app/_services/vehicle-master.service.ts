import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VehicleMasterModule, listVehicleType } from '../_models/vehicle-master.module';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class VehicleMasterService {

  formVehicle: VehicleMasterModule
  listVehicle: object;
  listVehicleType: listVehicleType[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindVehicleType() {
    this.http.post(this.eventRootURL + '/api/get/vehicalType', null).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.listVehicleType = res.data as listVehicleType[]
        });
  }

  postClientDetail() {
    let formData: FormData = new FormData();
    formData.append('number', this.formVehicle.number);
    formData.append('type_id', this.formVehicle.type);
    formData.append('available_start_time', this.formVehicle.available_start_time);
    formData.append('available_end_time', this.formVehicle.available_end_time);
    return this.http.post(this.eventRootURL + '/api/add/vehicle', formData);
  }

  putClientDetail() {
    let formData: FormData = new FormData();
    formData.append('vehicle_id', this.formVehicle.Id.toString());
    formData.append('number', this.formVehicle.number);
    formData.append('type_id', this.formVehicle.type);
    formData.append('available_start_time', this.formVehicle.available_start_time);
    formData.append('available_end_time', this.formVehicle.available_end_time);
    return this.http.post(this.eventRootURL + '/api/edit/vehicle', formData);
  }

  deleteVehicleDetail(id) {
    let formData: FormData = new FormData();
    formData.append('vehicle_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/vehicle', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/vehicle', null).toPromise()
      .then((res: any) => {
        this.listVehicle = res.data
        this.spinner.hide();
      })
  }

  getAllVehicle() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/vehicle', null).toPromise()
      .then((res: any) => {
        this.listVehicle = res.data
        this.spinner.hide();
      })
  };
}
