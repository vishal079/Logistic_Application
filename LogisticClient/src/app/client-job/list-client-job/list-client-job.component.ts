import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClientJobMasterService } from 'src/app/_services/client-job-master.service';
import { clientJobMaster } from 'src/app/_models/client-job-master.module';
import { clientAddresstMaster } from 'src/app/_models/client-address-master.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-client-job',
  templateUrl: './list-client-job.component.html',
  styles: []
})
export class ListClientJobComponent implements OnInit {
  _objclientJobMaster: any;
  _FilterStatus: any = -1;
  _FilterDeliveryDate: any;//NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  isCollapsed = true;
  mamage_job_popup_name = "Create Job";
  report_currentDateTime = new Date();

  constructor(private http: HttpClient, public clientService: ClientJobMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.clientService.getAllClientJobs(null, null);
  }

  getLogType(logType: string) {
    let logtypeLabel = '';
    if (logType === '1') {
      logtypeLabel = 'Pickup';
    } else if (logType === '2') {
      logtypeLabel = 'Delivered';
    } else if (logType === '3') {
      logtypeLabel = 'Rescheduled';
    } else if (logType === '4') {
      logtypeLabel = 'Return in progress';
    } else if (logType === '5') {
      logtypeLabel = 'Returned';
    }

    return logtypeLabel;
  }

  CancelJob(event, jobId) {
    if (confirm("Are you sure you want to cancel this job?")) {
      this.clientService.cancelJob(jobId).subscribe(
        (res: any) => {
          if (res.status) {
            this.toastr.success("", res.message);
            this.clientService.refreshList();
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

  createJob(e) {
    this.clientService.formEvent = {
      Id: 0,
      client_id: localStorage.getItem('client_id'),
      user_id: localStorage.getItem('user_id'),
      job_title: "",
      job_type: 1,
      is_multi_location: "0",
      pickup_location_id: 0,
      delivery_location_id: 0,
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
    var schedule_date = new Date();
    this.clientService._eventDateTime = { year: schedule_date.getFullYear(), month: schedule_date.getMonth() + 1, day: schedule_date.getDate() };
    this.mamage_job_popup_name = "Create Job";
  }

  BindJobEditMode(event, objJob) {
    debugger;
    for (let index = 0; index < objJob.deliveryLocation.length; index++) {
      objJob.deliveryLocation[index].isExisting = 'true';
    }
    this.clientService.formEvent = {
      client_id: objJob.client_id,
      Id: objJob.id,
      job_title: objJob.item_details,
      is_multi_location: objJob.is_multi_location_delivery,
      company_id: objJob.company_id,
      contact_person: parseInt(objJob.contact_person_id),
      delivery_location: objJob.deliveryLocation,
      delivery_type: objJob.delivery_type,
      phone: '',
      pick_up_location: new clientAddresstMaster(),
      job_type: objJob.job_type,
      other_details: objJob.other_details,
      pickup_location_id: parseInt(objJob.pickup_location_id),
      delivery_location_id: 0,// parseInt(objJob.deliveryLocation),
      schedule_date: objJob.delivery_date,
      user_id: objJob.user_id,
      vehicle_type: objJob.vehicle_id
    };
    var schedule_date = new Date(objJob.delivery_date);
    this.clientService._eventDateTime = { year: schedule_date.getFullYear(), month: schedule_date.getMonth() + 1, day: schedule_date.getDate() };
    this.mamage_job_popup_name = "Edit Job";
    //document.getElementById("openModalButton").click();
  }

  DuplicateJob(event, objJob) {
    debugger;
    this.clientService.formEvent = {
      client_id: objJob.client_id,
      Id: 0,
      job_title: objJob.item_details,
      is_multi_location: objJob.is_multi_location_delivery,
      company_id: objJob.company_id,
      contact_person: parseInt(objJob.contact_person_id),
      delivery_location: objJob.deliveryLocation,
      delivery_type: objJob.delivery_type,
      phone: '',
      pick_up_location: new clientAddresstMaster(),
      job_type: objJob.job_type,
      other_details: objJob.other_details,
      pickup_location_id: parseInt(objJob.pickup_location_id),
      delivery_location_id: parseInt(objJob.delivery_location_id),
      schedule_date: objJob.delivery_date,
      user_id: objJob.user_id,
      vehicle_type: objJob.vehicle_id
    };
    var schedule_date = new Date(objJob.delivery_date);
    this.clientService._eventDateTime = { year: schedule_date.getFullYear(), month: schedule_date.getMonth() + 1, day: schedule_date.getDate() };
    this.mamage_job_popup_name = "Duplicate Job";
  }

  showJobDetails(e, objJob) {
    debugger;
    var pickupSignPath = "";
    var deliverySignPath = "";
    var pickupImagesPaths = [];
    var deliveryImagesPaths = [];
    if (objJob.image != null) {
      var pickup_Images = objJob.image.filter(this.filterPickupImages);
      var pickup_Signs = objJob.image.filter(this.filterPickupSings);
      var delivery_Images = objJob.image.filter(this.filterDeliveryImages);
      var delivery_Signs = objJob.image.filter(this.filterDeliverySings);
      var pickupDetails = {
        line1: objJob.line1, city: objJob.city,
        state: objJob.state, country: objJob.country,
        postal_code: objJob.postal_code,
        pickup_Images: pickup_Images,
        pickup_Signs: pickup_Signs
      }
      for (let i = 0; i < objJob.deliveryLocation.length; i++) {
        objJob.deliveryLocation[i].deliveryImages = [];
        objJob.deliveryLocation[i].deliverySigns = [];

        for (let j = 0; j < delivery_Images.length; j++) {
          if (delivery_Images[j].job_delivery_id == objJob.deliveryLocation[i].id) {
            objJob.deliveryLocation[i].deliveryImages.push(delivery_Images[j]);
          }
        }
        for (let j = 0; j < delivery_Signs.length; j++) {
          if (delivery_Signs[j].job_delivery_id == objJob.deliveryLocation[i].id) {
            objJob.deliveryLocation[i].deliverySigns.push(delivery_Signs[j]);
          }
        }
      }
    }
    var staff_delivery_date = objJob.deliveryLocation[objJob.deliveryLocation.length - 1].staff_delivery_date;
    objJob.jobStatusLabe = (objJob.jobStatusLabe == "Pickup") ? "Picked up" : objJob.jobStatusLabe;
    this._objclientJobMaster = {
      Job_Id: objJob.item_id,
      job_title: objJob.item_details,
      is_multi_location: (objJob.is_multi_location_delivery == "0") ? 'No' : 'Yes',
      delivery_location: objJob.deliveryLocation,
      job_status: objJob.job_status,
      job_type: objJob.jobTypeLabel,
      delivery_date: objJob.delivery_date,
      contactPersonName: objJob.contactPersonName,
      pick_up_location: [pickupDetails],
      pickupSignPath: pickupSignPath,
      deliverySignPath: deliverySignPath,
      pickupImagesPaths: pickupImagesPaths,
      deliveryImagesPaths: deliveryImagesPaths,
      _assign_date: objJob.assign_date,
      jobStatusLabe: objJob.jobStatusLabe,
      created_at: objJob.created_at,
      staff_pick_up_date: objJob.deliveryLocation[0].staff_pick_up_date,
      staff_delivery_date: (staff_delivery_date == null) ? "Pending" : staff_delivery_date,
      vehicle_type: objJob.vehicle_id,
      vehicalType: objJob.vehicalType,
      vehicalName: objJob.vehicalName
    };
  }

  filterDeliveryImages(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "2") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  filterDeliverySings(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "4") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  filterPickupImages(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "1") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  filterPickupSings(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "3") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  FilterJobs() {
    debugger;
    var deliveryDate = "";
    if (this._FilterDeliveryDate != null) {
      deliveryDate = this._FilterDeliveryDate.year + '-' + this._FilterDeliveryDate.month + '-' + this._FilterDeliveryDate.day;
    }

    var status = parseInt(this._FilterStatus) - 1;
    status = (status == -1) ? null : status;
    this.clientService.getAllClientJobs(status, deliveryDate);
  }

  ClearFilter() {
    this._FilterDeliveryDate = ""//{ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    this._FilterStatus = -1;
    this.clientService.getAllClientJobs(null, null);
  }

  // PrintPage() {
  //   window.print();
  // }
}
