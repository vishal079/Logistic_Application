import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ManageJobService } from '../_services/manage-job.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styles: []
})
export class ManageJobComponent implements OnInit {

  imageSrc: string[];
  fileToUpload: FileList = null;
  filesToUpload = null;
  _FilterStatus: any = '-1';
  isCollapsed = true;
  public unableToDeliverReason = '';
  public unableToDeliverOption = 'schedule_next_date';
  public scheduleNextDate: any;
  readonly eventRootURL = environment.baseUrl;

  @ViewChild('signaturePad', { static: false }) signaturePad;
  @ViewChild('returnSignature', { static: false }) returnSignaturePad;

  width = 400;
  height = 180;
  options: any = null;
  public _objclientJobMaster: any;
  _FilterDeliveryDate: any;
  public rescheduleOrCancelJobInfo = {
    job_id: '',
    staff_id: '',
    job_develivery_location_id: '',
    date: 'Y-m-d',
    details: ''
  };

  public cancelJobInfo = {
    job_id: '',
    staff_id: '',
    job_develivery_location_id: '',
    details: ''
  };

  constructor(
    public manageJobService: ManageJobService,
    private httpClient: HttpClient,
    private toastr: ToastrService,
    config: NgbDatepickerConfig) {
    config.minDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  }

  ngOnInit() {
    this.manageJobService.bindAssignedJobs(null, null);
  }

  AcceptJob(e, objJob, acceptStatus) {
    if (acceptStatus === 2) {
      if (confirm('Are you sure you want to decline this job?')) {
        this.updateStatus(objJob, acceptStatus);
      }
    } else {
      this.updateStatus(objJob, acceptStatus);
    }
  }

  updateStatus(objJob, status) {
    this.manageJobService.updateStatus(objJob, status).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.toastr.success('Submitted Successfully', res.message);
          this.manageJobService.bindAssignedJobs(null, null);
        } else {
          this.toastr.error('', res.message);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  async returnJob() {
    // tslint:disable-next-line: variable-name
    let job_delivery_id = this._objclientJobMaster.delivery_location[0].id;

    let deliveryCount = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this._objclientJobMaster.delivery_location.length; index++) {
      if (this._objclientJobMaster.delivery_location[index].isSelected) {
        deliveryCount++;
      }
    }
    if (deliveryCount > 1) {
      this.toastr.error('', 'You can not select multiple delivery location!');
      return false;
    } else if (deliveryCount === 0) {
      this.toastr.error('', 'Please select delivery location!');
      return false;
    }

    if (!this.filesToUpload) {
      this.toastr.error('', 'Please upload return delivery image.');
      return false;
    }

    if (this.returnSignaturePad._signaturePad._isEmpty) {
      this.toastr.error('', 'Please get return signature.');
      return false;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this._objclientJobMaster.delivery_location.length; index++) {
      if (this._objclientJobMaster.delivery_location[index].isSelected) {
        job_delivery_id = this._objclientJobMaster.delivery_location[index].id;
        break;
      }
    }

    const formDataImageUpload: FormData = new FormData();

    formDataImageUpload.append('job_id', this._objclientJobMaster.id);
    formDataImageUpload.append('staff_id', this._objclientJobMaster.staff_id);
    formDataImageUpload.append('image_type', '6');
    formDataImageUpload.append('job_delivery_id', job_delivery_id);
    formDataImageUpload.append('file', this.filesToUpload);
    const signatureData = this.returnSignaturePad.toDataURL();
    formDataImageUpload.append('signature_image', signatureData);

    const response = await this.httpClient.post(this.eventRootURL + '/api/staff/add/job_image', formDataImageUpload).toPromise();

    if (response['status']) {
      this.toastr.success('', 'Job returned successfully!');
      this.clearReturnSignature();
      this.manageJobService.bindDashboard();
    }
  }

  async rescheduleOrCancelJob() {

    // tslint:disable-next-line: variable-name
    let job_delivery_id = this._objclientJobMaster.delivery_location[0].id;

    let deliveryCount = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this._objclientJobMaster.delivery_location.length; index++) {
      if (this._objclientJobMaster.delivery_location[index].isSelected) {
        deliveryCount++;
      }
    }
    if (deliveryCount > 1) {
      this.toastr.error('', 'You can not select multiple delivery location!');
      return false;
    } else if (deliveryCount === 0) {
      this.toastr.error('', 'Please select delivery location!');
      return false;
    }
    let scheduleDate = '';

    if (this.scheduleNextDate != null && typeof (this.scheduleNextDate) !== 'undefined') {
      scheduleDate = this.scheduleNextDate.year + '-' + this.scheduleNextDate.month + '-' + this.scheduleNextDate.day;
    }
    if (this.unableToDeliverOption === 'schedule_next_date' && !scheduleDate) {
      this.toastr.error('', 'Please select reschedule date!');
      return false;
    }

    if (!this.unableToDeliverReason) {
      this.toastr.error('', 'Please specify reason for unable to deliver!');
      return false;
    }

    if (!this.filesToUpload) {
      this.toastr.error('', 'Please upload unable to delivery image.');
      return false;
    }

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this._objclientJobMaster.delivery_location.length; index++) {
      if (this._objclientJobMaster.delivery_location[index].isSelected) {
        job_delivery_id = this._objclientJobMaster.delivery_location[index].id;
        break;
      }
    }

    const formDataImageUpload: FormData = new FormData();

    formDataImageUpload.append('job_id', this._objclientJobMaster.id);
    formDataImageUpload.append('staff_id', this._objclientJobMaster.staff_id);
    formDataImageUpload.append('image_type', this.unableToDeliverOption === 'return' ? '5' : '7');
    formDataImageUpload.append('job_delivery_id', job_delivery_id);
    formDataImageUpload.append('file', this.filesToUpload);


    const response = await this.httpClient.post(this.eventRootURL + '/api/staff/add/job_image', formDataImageUpload).toPromise();

    if (response['status']) {

      const unableToDeliverFormData: FormData = new FormData();

      unableToDeliverFormData.append('job_id', this._objclientJobMaster.id);
      unableToDeliverFormData.append('staff_id', this._objclientJobMaster.staff_id);

      if (this.unableToDeliverOption === 'schedule_next_date') {
        unableToDeliverFormData.append('date', scheduleDate);
        unableToDeliverFormData.append('details', this.unableToDeliverReason);
      } else {
        unableToDeliverFormData.append('cancel_details', this.unableToDeliverReason);
      }



      unableToDeliverFormData.append('job_develivery_location_id', job_delivery_id);

      const unableToDeliverAPIURL = this.unableToDeliverOption === 'schedule_next_date'
        ? 'change_job_reschedule_status' : 'change_job_cancel_status';
      const unableToDeliverStatus = await this.httpClient.post(this.eventRootURL + '/api/staff/'
        + unableToDeliverAPIURL, unableToDeliverFormData).toPromise();

      console.log('unableToDeliverStatus: ', unableToDeliverStatus);
      if (unableToDeliverStatus['status']) {
        if (this.unableToDeliverOption === 'schedule_next_date') {
          this.toastr.success('', 'Job rescheduled successfully!');
        } else {
          this.toastr.success('', 'Job cancelled successfully!');
        }

        this.manageJobService.bindDashboard();
      }
    }
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
      isPickup
    };
  }

  unableToDeliverJob(e, objJob, title) {
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
      modalPopupTitle: title
    };
  }

  clearSignature() {
    // console.log('clear');
    this.signaturePad.clear();
  }

  clearReturnSignature() {
    this.returnSignaturePad.clear();
  }

  readURL(event: Event): void {
    debugger;
    if ((event.target as HTMLInputElement).files && (event.target as HTMLInputElement).files[0]) {
      this.filesToUpload = (event.target as HTMLInputElement).files;
      for (let index = 0; index < (event.target as HTMLInputElement).files.length; index++) {
        // const file = (<HTMLInputElement>event.target).files[index];
        const file = (event.target as HTMLInputElement).files[0];
        let imagePath = '';
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);
        reader.onload = e => imagePath = reader.result.toString();
        debugger;
        // this.imageSrc.push(imagePath);
        // reader.readAsDataURL(file);
      }
    }
  }

  fileProgress(fileInput: any) {
    debugger;
    // this.fileData = <File>fileInput.target.files[0];
    this.filesToUpload = fileInput[0] as File;
  }

  async SaveDetails_And_Pickup_Deliver(objJobDetails, status) {
    debugger;
    let job_delivery_id = objJobDetails.delivery_location[0].id;
    // check multipoint delivery count
    if (!objJobDetails.isPickup) {
      let deliveryCount = 0;
      for (let index = 0; index < objJobDetails.delivery_location.length; index++) {
        if (objJobDetails.delivery_location[index].isSelected) {
          deliveryCount++;
        }
      }
      if (deliveryCount > 1) {
        this.toastr.error('', 'You can not select multiple delivery location!');
        return false;
      } else if (deliveryCount == 0) {
        this.toastr.error('', 'Please select delivery location!');
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
      if (objJobDetails.isPickup) {
        this.toastr.error('', 'Please upload pickup image.');
      } else {
        this.toastr.error('', 'Please upload delivery image.');
      }
      return false;
    }

    if (this.signaturePad._signaturePad._isEmpty) {
      if (objJobDetails.isPickup) {
        this.toastr.error('', 'Please get pickup signature.');
      } else {
        this.toastr.error('', 'Please get delivery signature.');
      }
      return false;
    }

    const formDataImageUpload: FormData = new FormData();
    formDataImageUpload.append('job_id', objJobDetails.id);
    formDataImageUpload.append('staff_id', objJobDetails.staff_id);
    if (objJobDetails.isPickup) {
      formDataImageUpload.append('image_type', '1');
    } else {
      formDataImageUpload.append('image_type', '2');
    }
    formDataImageUpload.append('job_delivery_id', job_delivery_id);
    formDataImageUpload.append('file', this.filesToUpload);
    const response = await this.httpClient.post(this.eventRootURL + '/api/staff/add/job_image', formDataImageUpload).toPromise();
    if (response['status']) {
      // Upload Signature
      const signatureData = this.signaturePad.toDataURL();
      const formDataSignUpload: FormData = new FormData();
      formDataSignUpload.append('job_id', objJobDetails.id);
      formDataSignUpload.append('staff_id', objJobDetails.staff_id);
      formDataSignUpload.append('job_delivery_id', job_delivery_id);
      if (objJobDetails.isPickup) {
        formDataSignUpload.append('image_type', '3');
      } else {
        formDataSignUpload.append('image_type', '4');
      }
      formDataSignUpload.append('signature_image', signatureData);

      const responseSignStatus = await this.httpClient.post(this.eventRootURL + '/api/staff/add/job_image', formDataSignUpload).toPromise();
      if (responseSignStatus) {
        // Change Status to Pickup Status
        const formData: FormData = new FormData();
        formData.append('job_id', objJobDetails.id);
        formData.append('staff_id', objJobDetails.staff_id);
        formData.append('status', status);
        if (objJobDetails.isPickup) {
          const responsePickupStatus = await this.httpClient.post(this.eventRootURL + '/api/staff/change_job_pickup_status', formData).toPromise();
          if (responsePickupStatus) {
            this.toastr.success('Submitted Successfully', 'Job Picked-up successfully.');
            this.clearSignature();
            this.manageJobService.bindDashboard();
          }
        } else {
          formData.append('job_develivery_location_id', job_delivery_id);
          const responsePickupStatus = await this.httpClient.post(this.eventRootURL + '/api/staff/change_job_deliveryed_status', formData).toPromise();
          if (responsePickupStatus) {
            this.toastr.success('Submitted Successfully', 'Job Delivered successfully.');
            this.clearSignature();
            this.manageJobService.bindDashboard();
          }
        }
      }
    }
    // console.log('No issues, I will wait until promise is resolved..');
  }

  FilterJobs() {
    debugger;
    let deliveryDate = '';
    if (this._FilterDeliveryDate != null && typeof (this._FilterDeliveryDate) != 'undefined') {
      deliveryDate = this._FilterDeliveryDate.year + '-' + this._FilterDeliveryDate.month + '-' + this._FilterDeliveryDate.day;
    }

    const status = (this._FilterStatus === '-1') ? null : this._FilterStatus;

    this.manageJobService.bindAssignedJobs(status, deliveryDate);
  }

  ClearFilter() {
    this._FilterDeliveryDate = '';
    this._FilterStatus = '-1';
    this.manageJobService.bindAssignedJobs(null, null);
  }

  PrintJobDetails(e, objJob) { }
}
