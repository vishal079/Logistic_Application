import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { ClientJobMasterService } from 'src/app/_services/client-job-master.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { clientAddresstMaster } from 'src/app/_models/client-address-master.module';

@Component({
  selector: 'app-client-job-master',
  templateUrl: './client-job-master.component.html',
  styles: []
})
export class ClientJobMasterComponent implements OnInit {

  constructor(public clientJobService: ClientJobMasterService, private toastr: ToastrService) { }
  _pickupLocationSelect: string;

  ngOnInit() {
    this.resetForm();
    this.clientJobService.bindVehicleType();
    this.clientJobService.bindPickupAddress();
    this.clientJobService.bindDeliveryAddress();
    this.clientJobService.getAllSubCompany(localStorage.getItem('company_id'));
    this.clientJobService.bindContactPerson();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientJobService.formEvent = {
      Id: 0,
      company_id: localStorage.getItem('company_id'),
      user_id: localStorage.getItem('user_id'),
      job_title: "",
      job_type: 1,
      is_multi_location: "0",
      pickup_location_id: 0,
      delivery_location_id: 0,
      pick_up_location: new clientAddresstMaster(),
      delivery_location: [{
        id: Date.now(),
        company_id: '',
        line1: '',
        postal_code: '',
        city: '',
        state: '',
        country: '',
        line2: '',
        phone: '',
        name: '',
        isExisting: 'true',
        delivery_address_id: ''
      }],
      phone: "",
      contact_person: 0,
      vehicle_type: 0,
      delivery_type: 0,
      other_details: "",
      client_id: "",
      schedule_date: ""
    };
    this._pickupLocationSelect = 'drpLocation';
    //this._eventDateTime = new Date();
  }

  /* Start Delivery Address */
  public addDeliveryLocation(): void {

    // CAUTION: When we output the form controls, we need to provide a unique name
    // for each input (so that it can be registered with the parent NgForm). For the
    // sake of this demo, we're going to use the current TIMPESTAMP (Date.now()) as a
    // hook into something unique about this model.
    this.clientJobService.formEvent.delivery_location.push({
      id: Date.now(), //<--- uniqueness hook.
      company_id: '',
      line1: '',
      postal_code: '',
      city: '',
      state: '',
      country: '',
      line2: '',
      phone: '',
      name: '',
      isExisting: 'true',
      delivery_address_id: ''
    });
  }

  public removeDeliveryLocation(index: number): void {
    this.clientJobService.formEvent.delivery_location.splice(index, 1);
  }
  /* End Delivery Address */

  onSubmit(form: NgForm) {
    //debugger;
    // console.log(this.clientJobService.formEvent.delivery_location);
    // console.log(form.value);
    //this.clientJobService.formEvent.CreatedDate = this.clientJobService.year + '-' + this.clientJobService.month + '-' + this._eventDateTime.day;
    console.log(this.clientJobService.formEvent.Id);
    if (this.clientJobService.formEvent.Id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  changeType(deliveryType) {
    const today = new Date();
    debugger;
    if (deliveryType === 1) {
      this.clientJobService._eventDateTime = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    }
    else if (deliveryType === 2) {
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      this.clientJobService._eventDateTime = { year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate() };
    }
  }

  insertRecord(form: NgForm) {
    debugger;
    //return false;
    this.clientJobService.formEvent.schedule_date = this.clientJobService._eventDateTime.year + '-' + this.clientJobService._eventDateTime.month + '-' + this.clientJobService._eventDateTime.day;
    if (this._pickupLocationSelect != 'drpLocation') {
      this.clientJobService.formEvent.pickup_location_id = null;
    }
    this.clientJobService.postClientDetail().subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientJobService.refreshList();
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

  updateRecord(form: NgForm) {
    this.clientJobService.formEvent.schedule_date = this.clientJobService._eventDateTime.year + '-' + this.clientJobService._eventDateTime.month + '-' + this.clientJobService._eventDateTime.day;
    this.clientJobService.putClientDetail().subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientJobService.refreshList();
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
