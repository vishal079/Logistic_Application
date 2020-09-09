import { Component, OnInit, Input } from '@angular/core';
import { clientAddresstMaster } from 'src/app/_models/client-job.module';
import { JobMasterService } from 'src/app/_services/job-master.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styles: []
})
export class ManageJobComponent implements OnInit {
  constructor(public jobMasterService: JobMasterService, private toastr: ToastrService) { }
  _pickupLocationSelect: string;
  @Input() result: string = "";
  ngOnInit() {
    console.log('ManageJobComponent init');
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.jobMasterService.formEvent = {
      Id: 0,
      client_id: localStorage.getItem('client_id'),
      user_id: localStorage.getItem('user_id'),
      job_title: "",
      job_type: 1,
      is_multi_location: "0",
      pickup_location_id: 0,
      pick_up_location: new clientAddresstMaster(),
      delivery_location: [{
        id: Date.now(),
        client_id: '',
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
      company_id: "",
      schedule_date: ""
    };
    this._pickupLocationSelect = 'drpLocation';
    //this._eventDateTime = new Date();
  }

  /* Start Delivery Address */
  public addDeliveryLocation(e): void {

    e.preventDefault();
    // CAUTION: When we output the form controls, we need to provide a unique name
    // for each input (so that it can be registered with the parent NgForm). For the
    // sake of this demo, we're going to use the current TIMPESTAMP (Date.now()) as a
    // hook into something unique about this model.
    this.jobMasterService.formEvent.delivery_location.push({
      id: Date.now(), //<--- uniqueness hook.
      client_id: '',
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
    this.jobMasterService.formEvent.delivery_location.splice(index, 1);
  }
  /* End Delivery Address */
  onSubmit(form: NgForm) {
    console.log(this.jobMasterService.formEvent.Id);
    if (this.jobMasterService.formEvent.Id === 0) {
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
      this.jobMasterService._eventDateTime = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() };
    }
    else if (deliveryType === 2) {
      const tomorrow = new Date(today.setDate(today.getDate() + 1));
      this.jobMasterService._eventDateTime = { year: tomorrow.getFullYear(), month: tomorrow.getMonth() + 1, day: tomorrow.getDate() };
    }
  }

  insertRecord(form: NgForm) {
    // debugger;
    // this.jobMasterService.formEvent.schedule_date = this.jobMasterService._eventDateTime.year + '-' + this.jobMasterService._eventDateTime.month + '-' + this.jobMasterService._eventDateTime.day;
    // this.jobMasterService.postClientDetail().subscribe(
    //   (res: any) => {
    //     console.log(res);
    //     debugger;
    //     if (res.status) {
    //       this.resetForm(form);
    //       this.toastr.success("", res.message);
    //       this.jobMasterService.refreshList();
    //     }
    //     else {
    //       this.toastr.error("", res.message);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  updateRecord(form: NgForm) {
    this.jobMasterService.formEvent.schedule_date = this.jobMasterService._eventDateTime.year + '-' + this.jobMasterService._eventDateTime.month + '-' + this.jobMasterService._eventDateTime.day;
    this.jobMasterService.putClientDetail().subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.jobMasterService.refreshList();
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
