import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { clientJobMaster, listSubCompany, listVehicleType, listPickupAddress, listContactPerson } from '../_models/client-job-master.module';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ClientJobMasterService {
  formEvent: clientJobMaster;
  _eventDateTime: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  listVehicleType: listVehicleType[];
  listPickupAddress: listPickupAddress[];
  listDeliveryAddress: listPickupAddress[];
  listClientJob: object;
  listSubCompany: listSubCompany[];
  listContactPerson: listContactPerson[];

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  readonly eventRootURL = environment.baseUrl;

  bindVehicleType() {
    this.http.post(this.eventRootURL + '/api/get/vehicalType', null).toPromise()
      .then(
        (res: any) => {
          debugger;
          this.listVehicleType = res.data as listVehicleType[];
        });
  }

  bindPickupAddress() {
    this.http.post(this.eventRootURL + '/api/client/get/address', null).toPromise()
      .then(
        (res: any) => {
          var lstpickupAddress = [];
          debugger;
          res.data.forEach(element => {
            var item = new listPickupAddress();
            item.id = element.id;
            item.address = (element.line1 != null) ? element.line1 + ' ' : '';
            item.address += (element.city != null) ? element.city + ' ' : '';
            item.address += (element.state != null) ? element.state + ' ' : '';
            item.address += (element.country != null) ? element.country + ' ' : '';
            item.address += (element.postal_code != null) ? element.postal_code + ' ' : '';
            lstpickupAddress.push(item);
          });
          this.listPickupAddress = lstpickupAddress as listPickupAddress[];
        });
  }

  bindDeliveryAddress() {
    this.http.post(this.eventRootURL + '/api/client/get/deliveryAddress', null).toPromise()
      .then(
        (res: any) => {
          var lstdeliveryAddress = [];
          debugger;
          res.data.forEach(element => {
            var item = new listPickupAddress();
            item.id = element.id;
            item.address = (element.line1 != null) ? element.line1 + ' ' : '';
            item.address += (element.city != null) ? element.city + ' ' : '';
            item.address += (element.state != null) ? element.state + ' ' : '';
            item.address += (element.country != null) ? element.country + ' ' : '';
            item.address += (element.postal_code != null) ? element.postal_code + ' ' : '';
            lstdeliveryAddress.push(item)
          });
          this.listDeliveryAddress = lstdeliveryAddress as listPickupAddress[];
        });
  }

  bindContactPerson() {
    this.http.post(this.eventRootURL + '/api/client/get/person', null).toPromise()
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
    if (this.formEvent.pickup_location_id != null)
      formData.append('pickup_location_id', this.formEvent.pickup_location_id.toString());
    else {
      formData.append('line1', this.formEvent.pick_up_location.line1);
      formData.append('line2', this.formEvent.pick_up_location.line2);
      formData.append('city', this.formEvent.pick_up_location.city);
      formData.append('state', this.formEvent.pick_up_location.state);
      formData.append('country', this.formEvent.pick_up_location.country);
      formData.append('postal_code', this.formEvent.pick_up_location.postal_code);
    }
    formData.append('delivery_date', this.formEvent.schedule_date);
    var existingDeliveryLocation = this.formEvent.delivery_location.filter(this.filterExistingDeliveryAddress);
    var NewDeliveryLocation = this.formEvent.delivery_location.filter(this.filterNewDeliveryAddress);
    formData.append('delivery_location', JSON.stringify(NewDeliveryLocation));
    formData.append('delivery_location_id', JSON.stringify(existingDeliveryLocation));
    return formData;
  }

  filterExistingDeliveryAddress(element, index, array) {
    if (element.isExisting == "true") {
      var newElement = {
        delivery_address_id: element.delivery_address_id,
        name: element.name,
        phone: element.phone
      }
      return newElement;
    }
  }

  filterNewDeliveryAddress(element, index, array) {
    if (element.isExisting == "false") {
      return element;
    }
  }

  postClientDetail() {
    //debugger;
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/create_job', formData);
  }

  putClientDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/update_job', formData);
  }

  cancelJob(id) {
    let formData: FormData = new FormData();
    formData.append('client_id', localStorage.getItem('client_id'));
    formData.append('job_id', id)
    return this.http.post(this.eventRootURL + '/api/client/cancel_job', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/job', null).toPromise()
      .then((res: any) => {
        this.listClientJob = res.data;
        this.spinner.hide();
      })
  }

  getAllClientJobs(status, deliveryDate) {
    this.spinner.show();
    debugger;
    let formData: FormData = new FormData();
    if (status != null && status != -1)
      formData.append('status', status);
    if (deliveryDate != null)
      formData.append('deliveryDate', deliveryDate);

    this.http.post(this.eventRootURL + '/api/client/get/job', formData).toPromise()
      .then((res: any) => {
        debugger;
        this.listClientJob = res.data;
        this.spinner.hide();
      })
  };
}
