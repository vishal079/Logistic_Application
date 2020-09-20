import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientSubCompanyMasterService } from '../_services/client-sub-company-master.service';
import { ToastrService } from 'ngx-toastr';
import { AssignJobMasterService } from '../_services/assign-job-master.service';
import { StaffMasterService } from '../_services/staff-master.service';
import { NgForm } from '@angular/forms';
import { JobMasterService } from '../_services/job-master.service';
import { clientAddresstMaster } from '../_models/client-job.module';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ClientMasterService } from '../_services/client-master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assign-job',
  templateUrl: './assign-job.component.html',
  styles: ['#collapseBasic {overflow: visible !important;}']
})
export class AssignJobComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  _objclientJobMaster: any;
  client_id: string = "";
  _FilterDeliveryDate: any;
  //_FilterDeliveryDate: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  _FilterStatus: any = -1;
  _filterClient: any = "";
  isCollapsed = true;
  report_currentDateTime = new Date();
  mamage_job_popup_name = "Manage Job";
  show = false;

  constructor(private http: HttpClient, public assignJob: AssignJobMasterService,
    public clientSubCompanyService: ClientSubCompanyMasterService, public staffService: StaffMasterService,
    private toastr: ToastrService, private jobMasterService: JobMasterService, public clientMasterService: ClientMasterService
    , private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.clientSubCompanyService.bindParentCompanys();
    this.staffService.getAllStaffMember();
    this.assignJob.getAllJobs(null, null, null);
    this.clientMasterService.getAllClients();
    this.resetForm();
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ClientJobs.xlsx');
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.assignJob.formEvent = {
      id: "",
      staff_id: ""
    };
    //this._eventDateTime = new Date();
  }

  onSubmit(form: NgForm) {
    console.log(this.assignJob.formEvent.id);
    if (this.assignJob.formEvent.id === "") {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {

  }

  cancelJob(e, jobId) {
    debugger;
    if (confirm("Are you sure you want to cancel this job?")) {
      this.jobMasterService.cancelJob(jobId).subscribe(
        (res: any) => {
          if (res.status) {
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

  updateRecord(form: NgForm) {
    this.assignJob.putJobAssignDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success("Update Successfully", "Client Details Updated Successfully!");
        this.assignJob.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }

  assignJobtoStaff(e, job_id, staff_id) {
    this.spinner.show();
    console.log('job id:' + job_id + ' staff_id:' + staff_id);
    let formData: FormData = new FormData();
    formData.append('job_id', job_id);
    formData.append('staff_id', staff_id);
    this.assignJob.postJobAssignDetail(formData).subscribe(
      (res: any) => {
        console.log(res);
        debugger;
        if (res.status) {
          this.toastr.success("", res.message);
          //this.assignJob.refreshList();
          this.FilterJobs();
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

  bindJobDetails(objJob) {
    debugger;
    for (let index = 0; index < objJob.deliveryLocation.length; index++) {
      objJob.deliveryLocation[index].isExisting = 'true';
    }
    this.client_id = objJob.client_id;
    this.jobMasterService.formEvent = {
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
      schedule_date: objJob.delivery_date,
      user_id: objJob.user_id,
      vehicle_type: objJob.vehicle_id,
    };
    var schedule_date = new Date(objJob.delivery_date);
    this.jobMasterService._eventDateTime = { year: schedule_date.getFullYear(), month: schedule_date.getMonth() + 1, day: schedule_date.getDate() };
    this.jobMasterService.bindVehicleType();
    this.jobMasterService.bindPickupAddress(objJob.client_id);
    this.jobMasterService.bindDeliveryAddress(objJob.client_id);
    this.jobMasterService.getAllSubCompany(objJob.client_id);
    this.jobMasterService.bindContactPerson(objJob.client_id);
    //document.getElementById("openModalButton").click();
  }

  DuplicateJob(event, objJob) {
    debugger;
    this.jobMasterService.formEvent = {
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
      schedule_date: objJob.delivery_date,
      user_id: objJob.user_id,
      vehicle_type: objJob.vehicle_id
    };
    var schedule_date = new Date(objJob.delivery_date);
    this.jobMasterService._eventDateTime = { year: schedule_date.getFullYear(), month: schedule_date.getMonth() + 1, day: schedule_date.getDate() };
    this.mamage_job_popup_name = "Duplicate Job";
  }

  getLogType(logType: string) {
    let logtypeLabel = '';
    if (logType === '1') {
      logtypeLabel = 'Pickup';
    } else if (logType === '2') {
      logtypeLabel = 'Delivery';
    } else if (logType === '3') {
      logtypeLabel = 'Reschedule';
    } else if (logType === '4') {
      logtypeLabel = 'Cancel';
    }

    return logtypeLabel;
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
      /* var rescheduleImages = objJob.image.filter(this.filterRescheduleImages);
      var returnImages = objJob.image.filter(this.filterReturnImages);
      var returnSigns = objJob.image.filter(this.filterReturnSigns); */

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
        /* objJob.deliveryLocation[i].rescheduleImages = [];
        objJob.deliveryLocation[i].returnImages = [];
        objJob.deliveryLocation[i].returnSigns = []; */

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
        /* for (let j = 0; j < rescheduleImages.length; j++) {
          if (rescheduleImages[j].job_delivery_id == objJob.deliveryLocation[i].id) {
            objJob.deliveryLocation[i].deliverySigns.push(rescheduleImages[j]);
          }
        } */
        /* for (let j = 0; j < returnImages.length; j++) {
          if (returnImages[j].job_delivery_id == objJob.deliveryLocation[i].id) {
            objJob.deliveryLocation[i].deliverySigns.push(returnImages[j]);
          }
        } */
        /* for (let j = 0; j < returnSigns.length; j++) {
          if (returnSigns[j].job_delivery_id == objJob.deliveryLocation[i].id) {
            objJob.deliveryLocation[i].deliverySigns.push(returnSigns[j]);
          }
        } */

      }
    }
    var staff_delivery_date = objJob.deliveryLocation[objJob.deliveryLocation.length - 1].staff_delivery_date;
    objJob.jobStatusLabe = (objJob.jobStatusLabe == "Pickup") ? "Picked up" : objJob.jobStatusLabe;
    this._objclientJobMaster = {
      Job_Id: objJob.item_id,
      job_title: objJob.item_details,
      is_multi_location: (objJob.is_multi_location_delivery == "0") ? 'No' : 'Yes',
      delivery_location: objJob.deliveryLocation,
      delivery_log: objJob.deliveryLog,
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

  filterRescheduleImages(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "7") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  filterReturnImages(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "6") {
      element.image_name = BaseImagePath + element.image_name;
      return element;
    }
  }

  filterReturnSigns(element, index, array) {
    var BaseImagePath = environment.baseUrl + "/uploads/";
    if (element.image_type == "6") {
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
    if (this._FilterDeliveryDate != null && typeof (this._FilterDeliveryDate) != "undefined") {
      deliveryDate = this._FilterDeliveryDate.year + '-' + this._FilterDeliveryDate.month + '-' + this._FilterDeliveryDate.day;
    }

    var status = parseInt(this._FilterStatus) - 1;
    status = (status < 0) ? null : status;

    this.assignJob.getAllJobs(this._filterClient, status, deliveryDate);
  }

  ClearFilter() {
    this._FilterDeliveryDate = ""//{ year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
    this._FilterStatus = -1;
    this._filterClient = "";
    this.assignJob.getAllJobs(null, null, null);
  }

  PrintPage() {
    debugger;
    let printContents, popupWin;
    printContents = document.getElementById('Print_Job_Details').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
