import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { clientJobMaster, listVehicleType, listPickupAddress, listSubCompany, listContactPerson } from '../_models/client-job.module';

@Injectable({
  providedIn: 'root'
})
export class JobMasterService {
  formEvent: clientJobMaster;
  _eventDateTime: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  listVehicleType: listVehicleType[];
  listPickupAddress: listPickupAddress[];
  listDeliveryAddress:listPickupAddress[];
  listClientJob: object;
  listSubCompany: listSubCompany[];
  listContactPerson: listContactPerson[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindVehicleType() {
    this.http.post(this.eventRootURL + '/api/get/vehicalType', null).toPromise()
      .then(
        (res: any) => {
          this.listVehicleType = res.data as listVehicleType[]
        });
  }

  bindPickupAddress(client_id) {
    var formData = new FormData();
    formData.append('client_id', client_id)
    this.http.post(this.eventRootURL + '/api/client/get/addressById', formData).toPromise()
      .then(
        (res: any) => {
          var lstpickupAddress = [];
          res.data.forEach(element => {
            var item = new listPickupAddress();
            item.id = element.id;
            item.address = element.line1 + ' ' + element.city + ' ' + element.state + ' ' + element.country + ' ' + element.postal_code;
            lstpickupAddress.push(item)
          });
          this.listPickupAddress = lstpickupAddress as listPickupAddress[];
        });
  }

  bindDeliveryAddress(client_id) {
    var formData = new FormData();
    formData.append('client_id', client_id)
    this.http.post(this.eventRootURL + '/api/client/get/deliveryAddressById', formData).toPromise()
      .then(
        (res: any) => {
          var lstdeliveryAddress = [];
          debugger;
          res.data.forEach(element => {
            var item = new listPickupAddress();
            item.id = element.id;
            item.address = element.line1 + ' ' + element.city + ' ' + element.state + ' ' + element.country + ' ' + element.postal_code;
            lstdeliveryAddress.push(item)
          });
          this.listDeliveryAddress = lstdeliveryAddress as listPickupAddress[];
        });
  }

  bindContactPerson(client_id) {
    var formData = new FormData();
    formData.append('client_id', client_id)
    this.http.post(this.eventRootURL + '/api/client/get/personById', formData).toPromise()
      .then(
        (res: any) => {
          var lstContactPerson = [];
          res.data.forEach(element => {
            var item = new listContactPerson();
            item.id = element.id;
            item.name = element.name;
            lstContactPerson.push(item)
          });
          this.listContactPerson = lstContactPerson as listContactPerson[];
        });
  }

  getAllSubCompany(client_id) {
    //debugger;
    this.spinner.show();
    console.log('getAllSubCompany() ' + client_id);
    let formData: FormData = new FormData();
    formData.append('client_id', client_id);
    this.http.post(this.eventRootURL + '/api/get/client_sub_company', formData).toPromise()
      .then((res: any) => {
        //debugger;
        //this.selectedParentCompany = client_id;
        this.listSubCompany = res.data as listSubCompany[]
        //this.listSubCompany = res.data;
        this.spinner.hide();
      })
  };

  private CreateFormData(): FormData {
    debugger;
    let formData: FormData = new FormData();
    formData.append('job_id', this.formEvent.Id.toString())
    formData.append('client_id', this.formEvent.client_id);
    formData.append('user_id', this.formEvent.user_id);
    formData.append('item_details', this.formEvent.job_title);
    formData.append('delivery_type', this.formEvent.delivery_type.toString());
    formData.append('is_multi_location_delivery', this.formEvent.is_multi_location.toString());
    formData.append('job_type', this.formEvent.job_type.toString());
    formData.append('total_delivery_location', this.formEvent.delivery_location.length.toString());
    formData.append('vehicle_id', this.formEvent.vehicle_type.toString());
    formData.append('contact_person_id', this.formEvent.contact_person.toString());
    formData.append('other_details', this.formEvent.other_details);
    if (this.formEvent.company_id != null && this.formEvent.company_id != "")
      formData.append('company_id', this.formEvent.company_id);
    else
      formData.append('company_id', this.formEvent.client_id);
    formData.append('pickup_location_id', this.formEvent.pickup_location_id.toString());
    formData.append('delivery_date', this.formEvent.schedule_date);
    formData.append('delivery_location', JSON.stringify(this.formEvent.delivery_location));
    return formData;
  }

  putClientDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/update/job', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/job', null).toPromise()
      .then((res: any) => {
        this.listClientJob = res.data;
        this.spinner.hide();
      })
  }

  getAllClientJobs() {
    this.spinner.show();
    //debugger;
    this.http.post(this.eventRootURL + '/api/client/get/job', null).toPromise()
      .then((res: any) => {
        debugger;
        this.listClientJob = res.data;
        this.spinner.hide();
      })
  };

  cancelJob(id) {
    let formData: FormData = new FormData();
    formData.append('job_id', id)
    return this.http.post(this.eventRootURL + '/api/delete/job', formData);
  }
}
