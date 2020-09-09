import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageJobService } from '../_services/manage-job.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styles: []
})
export class ManageJobComponent implements OnInit {

  imageSrc: string[];
  fileToUpload: FileList = null;
  filesToUpload = null;
  _FilterStatus: any = "-1";
  isCollapsed = true;
  readonly eventRootURL = environment.baseUrl;

  @ViewChild('signaturePad', { static: false }) signaturePad;

  width: number = 400;
  height: number = 180;
  options: any = null;
  public _objclientJobMaster: any;
  _FilterDeliveryDate: any;

  constructor(public manageJobService: ManageJobService, private httpClient: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.manageJobService.bindAssignedJobs(null, null);
  }

  AcceptJob(e, objJob, acceptStatus) {
    if (acceptStatus === 2) {
      if (confirm("Are you sure you want to decline this job?")) {
        this.updateStatus(objJob, acceptStatus);
      }
    }
    else {
      this.updateStatus(objJob, acceptStatus);
    }
  }

  updateStatus(objJob, status) {
    debugger;
    this.manageJobService.updateStatus(objJob, status).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success("Submitted Successfully", res.message);
          this.manageJobService.bindAssignedJobs(null, null);
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

  pickup_Delivery_Job(e, objJob, isPickup) {
    debugger;
    this._objclientJobMaster = {
      item_id: objJob.item_id,
      assign_date: objJob.assign_date,
      line1: objJob.line1,
      city: objJob.city,
      state: objJob.state,
      postal_code: objJob.postal_code,
      name: objJob.name,
      job_title: objJob.item_details,
      delivery_date: objJob.delivery_date,
      is_multi_location: (objJob.is_multi_location_delivery === '0') ? 'YES' : 'NO',
      delivery_location: objJob.deliveryLocation,
      job_status: objJob.job_status,
      id: objJob.id,
      staff_id: objJob.staff_id,
      modalPopupTitle: (isPickup) ? 'Pickup Details' : 'Delivery Details',
      isPickup: isPickup
    };
  }

  clearSignature() {
    //console.log('clear');
    this.signaturePad.clear();
  }

  readURL(event: Event): void {
    debugger;
    if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
      this.filesToUpload = (<HTMLInputElement>event.target).files;
      for (let index = 0; index < (<HTMLInputElement>event.target).files.length; index++) {
        //const file = (<HTMLInputElement>event.target).files[index];
        const file = (<HTMLInputElement>event.target).files[0];
        var imagePath = ""
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);
        reader.onload = e => imagePath = reader.result.toString();
        debugger;
        //this.imageSrc.push(imagePath);
        //reader.readAsDataURL(file);
      }
    }
  }

  fileProgress(fileInput: any) {
    debugger;
    // this.fileData = <File>fileInput.target.files[0];
    this.filesToUpload = <File>fileInput[0];
  }

  async SaveDetails_And_Pickup_Deliver(objJobDetails, status) {
    debugger;
    var job_delivery_id = objJobDetails.delivery_location[0].id;
    // check multipoint delivery count
    if (!objJobDetails.isPickup) {
      var deliveryCount = 0;
      for (let index = 0; index < objJobDetails.delivery_location.length; index++) {
        if (objJobDetails.delivery_location[index].isSelected) {
          deliveryCount++;
        }
      }
      if (deliveryCount > 1) {
        this.toastr.error("", "You can not select multiple delivery location!");
        return false;
      }
      else if (deliveryCount == 0) {
        this.toastr.error("", "Please select delivery location!");
        return false;
      }
      for (let index = 0; index < objJobDetails.delivery_location.length; index++) {
        if (objJobDetails.delivery_location[index].isSelected) {
          job_delivery_id = objJobDetails.delivery_location[index].id;
          break;
        }
      }
    }
    if (!this.filesToUpload) {
      if (objJobDetails.isPickup)
        this.toastr.error("", "Please upload pickup image.");
      else
        this.toastr.error("", "Please upload delivery image.");
      return false;
    }

    if (this.signaturePad._signaturePad._isEmpty) {
      if (objJobDetails.isPickup)
        this.toastr.error("", "Please get pickup signature.");
      else
        this.toastr.error("", "Please get delivery signature.");
      return false;
    }

    let formDataImageUpload: FormData = new FormData();
    formDataImageUpload.append('job_id', objJobDetails.id);
    formDataImageUpload.append('staff_id', objJobDetails.staff_id);
    if (objJobDetails.isPickup)
      formDataImageUpload.append('image_type', '1');
    else
      formDataImageUpload.append('image_type', '2');
    formDataImageUpload.append('job_delivery_id', job_delivery_id);
    formDataImageUpload.append('file', this.filesToUpload);
    let response = await this.httpClient.post(this.eventRootURL + "/api/staff/add/job_image", formDataImageUpload).toPromise();
    if (response["status"]) {
      //Upload Signature
      const signatureData = this.signaturePad.toDataURL();
      let formDataSignUpload: FormData = new FormData();
      formDataSignUpload.append('job_id', objJobDetails.id);
      formDataSignUpload.append('staff_id', objJobDetails.staff_id);
      formDataSignUpload.append('job_delivery_id', job_delivery_id);
      if (objJobDetails.isPickup)
        formDataSignUpload.append('image_type', '3');
      else
        formDataSignUpload.append('image_type', '4');
      formDataSignUpload.append('signature_image', signatureData);

      let responseSignStatus = await this.httpClient.post(this.eventRootURL + "/api/staff/add/job_image", formDataSignUpload).toPromise();
      if (responseSignStatus) {
        //Change Status to Pickup Status
        let formData: FormData = new FormData();
        formData.append('job_id', objJobDetails.id);
        formData.append('staff_id', objJobDetails.staff_id);
        formData.append('status', status);
        if (objJobDetails.isPickup) {
          let responsePickupStatus = await this.httpClient.post(this.eventRootURL + "/api/staff/change_job_pickup_status", formData).toPromise();
          if (responsePickupStatus) {
            this.toastr.success("Submitted Successfully", "Job Picked-up successfully.");
            this.clearSignature();
            this.manageJobService.bindDashboard();
          }
        }
        else {
          formData.append('job_develivery_location_id', job_delivery_id);
          let responsePickupStatus = await this.httpClient.post(this.eventRootURL + "/api/staff/change_job_deliveryed_status", formData).toPromise();
          if (responsePickupStatus) {
            this.toastr.success("Submitted Successfully", "Job Delivered successfully.");
            this.clearSignature();
            this.manageJobService.bindDashboard();
          }
        }
      }
    }
    //console.log('No issues, I will wait until promise is resolved..');
  }

  FilterJobs() {
    debugger;
    var deliveryDate = "";
    if (this._FilterDeliveryDate != null && typeof (this._FilterDeliveryDate) != "undefined") {
      deliveryDate = this._FilterDeliveryDate.year + '-' + this._FilterDeliveryDate.month + '-' + this._FilterDeliveryDate.day;
    }

    var status = (this._FilterStatus === "-1") ? null : this._FilterStatus;

    this.manageJobService.bindAssignedJobs(status, deliveryDate);
  }

  ClearFilter() {
    this._FilterDeliveryDate = "";
    this._FilterStatus = "-1";
    this.manageJobService.bindAssignedJobs(null, null);
  }

  PrintJobDetails(e, objJob) { }
}
