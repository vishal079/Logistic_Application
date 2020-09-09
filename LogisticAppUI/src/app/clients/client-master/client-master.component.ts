import { Component, OnInit, Input } from '@angular/core';
import { ClientMasterService } from 'src/app/_services/client-master.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client-master',
  templateUrl: './client-master.component.html',
  styles: [''],
  providers: [
    DatePipe
  ]
})
export class ClientMasterComponent implements OnInit {

  @Input() is_edit: boolean = false;

  constructor(public clientService: ClientMasterService, private datePipe: DatePipe, private toastr: ToastrService
    , private spinner: NgxSpinnerService) { }

  _eventDateTime: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDay() };
  ngOnInit() {
    this.resetForm();
    //this.eveService.bindAssembly();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientService.formEvent = {
      Id: 0,
      name: "",
      email: "",
      phone: "",
      password: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      Description: "",
      ClientType: 0,
      CreatedBy: "",
      CreatedDate: "",
      UpdatedBy: "",
      UpdatedDate: ""
    };
    //this._eventDateTime = new Date();
  }

  onSubmit(form: NgForm) {
    debugger;
    this.clientService.formEvent.CreatedDate = this._eventDateTime.year + '-' + this._eventDateTime.month + '-' + this._eventDateTime.day;
    console.log(this.clientService.formEvent.Id);
    if (this.clientService.formEvent.Id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.spinner.show();
    this.clientService.postClientDetail().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientService.refreshList();
        }
        else {
          this.toastr.error("", res.message);
        }
        this.spinner.hide();
      },
      err => {
        console.log(err);
        this.spinner.hide();
      }
    )
  }

  updateRecord(form: NgForm) {
    this.spinner.show();
    this.clientService.putClientDetail().subscribe(
      (res: any) => {
        //console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientService.refreshList();
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
}
