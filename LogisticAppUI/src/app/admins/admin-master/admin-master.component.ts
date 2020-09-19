import { Component, OnInit, Input } from '@angular/core';
import { AdminMasterService } from 'src/app/_services/admin-master.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html',
  styles: [''],
  providers: [
    DatePipe
  ]
})
export class AdminMasterComponent implements OnInit {

  @Input() is_edit = false;

  constructor(public adminService: AdminMasterService, private datePipe: DatePipe, private toastr: ToastrService
    ,         private spinner: NgxSpinnerService) { }

  _eventDateTime: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDay() };
  ngOnInit() {
    this.resetForm();
    // this.eveService.bindAssembly();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm();
    }
    this.adminService.formEvent = {
      Id: 0,
      name: '',
      email: '',
      phone: '',
      password: '',
      AdminType: '1',
      CreatedBy: '',
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: ''
    };
  }

  onSubmit(form: NgForm) {
    this.adminService.formEvent.CreatedDate = this._eventDateTime.year + '-' + this._eventDateTime.month + '-' + this._eventDateTime.day;
    console.log(this.adminService.formEvent.Id);
    if (this.adminService.formEvent.Id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.spinner.show();
    this.adminService.postAdminDetail().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success('', res.message);
          this.adminService.refreshList();
        } else {
          this.toastr.error('', res.message);
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  updateRecord(form: NgForm) {
    this.spinner.show();
    this.adminService.putAdminDetail().subscribe(
      (res: any) => {
        // console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success('', res.message);
          this.adminService.refreshList();
        } else {
          this.toastr.error('', res.message);
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
      }
    );
  }
}
