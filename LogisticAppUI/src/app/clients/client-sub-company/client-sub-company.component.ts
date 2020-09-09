import { Component, OnInit } from '@angular/core';
import { ClientMasterService } from 'src/app/_services/client-master.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { ClientSubCompanyMasterService } from 'src/app/_services/client-sub-company-master.service';

@Component({
  selector: 'app-client-sub-company',
  templateUrl: './client-sub-company.component.html',
  styles: [''],
  providers: [
    DatePipe
  ]
})
export class ClientSubCompanyComponent implements OnInit {

  constructor(public clientSubCompanyService: ClientSubCompanyMasterService, private datePipe: DatePipe, private toastr: ToastrService) { }

  _eventDateTime: NgbDateStruct = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDay() };
  ngOnInit() {
    this.resetForm();
    //this.eveService.bindAssembly();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientSubCompanyService.formClientSubCompany = {
      id: 0,
      name: "",
      address: "",
      phone: "",
      client_id: ""
    };
    //this._eventDateTime = new Date();
  }

  onSubmit(form: NgForm) {
    // this.eveService.formEvent.EventDateTime = this._eventDateTime.year + '-' + this._eventDateTime.month + '-' + this._eventDateTime.day;
    //console.log(this.clientSubCompanyService.formClientSubCompany.id);
    if (this.clientSubCompanyService.formClientSubCompany.id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    console.log('insert called');
    this.clientSubCompanyService.postSubCompany().subscribe(
      (res: any) => {
        if (res.message == 'Client Company inserted successfully') {
          this.resetForm(form);
          this.toastr.success("", "Sub Company Created Successfully!");
          this.clientSubCompanyService.refreshList();
        }
      },
      err => {
        console.log(err);
      }
    )
  }

  updateRecord(form: NgForm) {
    // this.eveService.putEventDetail().subscribe(
    //   res => {
    //     this.resetForm(form);
    //     this.toastr.success("Update Successfully", "Payment Details Updated.");
    //     this.eveService.refreshList();
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }
}
