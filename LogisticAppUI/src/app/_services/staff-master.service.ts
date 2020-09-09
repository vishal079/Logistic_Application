import { Injectable } from '@angular/core';
import { StaffMaster, listVehicle } from '../_models/staff-master.module';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class StaffMasterService {
  formStaff: StaffMaster
  listStaff: object;
  listVehicle: listVehicle[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindVehicle(isEdit, currentEmpVehicle) {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/unassing_vehical', null).toPromise()
      .then(
        (res: any) => {
          debugger;
          if (isEdit) {
            let customObj = new listVehicle();
            customObj.id = currentEmpVehicle.vehicle_id;
            customObj.number =  currentEmpVehicle.vehicle_name;
            let lstVehicle = res.data as listVehicle[];
            lstVehicle.push(customObj);
            this.listVehicle = lstVehicle;
          }
          else {
            this.listVehicle = res.data as listVehicle[];
          }
          this.spinner.hide();
        });
  }

  postClientDetail() {
    debugger;
    let formData: FormData = new FormData();
    formData.append('name', this.formStaff.name);
    formData.append('phone', this.formStaff.phone);
    formData.append('email', this.formStaff.email);
    formData.append('password', this.formStaff.password);
    formData.append('vehicle_id', this.formStaff.vehicle_id);
    return this.http.post(this.eventRootURL + '/api/add/staff', formData);
  }

  putClientDetail() {
    let formData: FormData = new FormData();
    formData.append('name', this.formStaff.name);
    formData.append('phone', this.formStaff.phone);
    formData.append('email', this.formStaff.email);
    formData.append('vehicle_id', this.formStaff.vehicle_id);
    formData.append('staff_id', this.formStaff.Id.toString());
    return this.http.post(this.eventRootURL + '/api/edit/staff', formData);
  }

  deleteEventDetail(id) {
    let formData: FormData = new FormData();
    formData.append('staff_id', id);
    return this.http.post(this.eventRootURL + '/api/delete/staff', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/get/staff', null).toPromise()
      .then((res: any) => {
        this.listStaff = res.data;
        this.spinner.hide();
      })
  }

  getAllStaffMember() {
    this.http.post(this.eventRootURL + '/api/get/staff', null).toPromise()
      .then((res: any) => {
        this.listStaff = res.data
      })
  };
}
