import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientContactMasterService } from '../_services/client-contact-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styles: []
})
export class ClientContactComponent implements OnInit {

  constructor(public clientContactMasterService: ClientContactMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientContactMasterService.formEvent = {
      id: 0,
      client_id: localStorage.getItem('client_id'),
      name: "",
      designation: "",
      phone: "",
      email: "",
    };
  }

  onSubmit(form: NgForm) {
    //this.clientContactMasterService.formEvent.CreatedDate = this.clientContactMasterService.year + '-' + this.clientContactMasterService.month + '-' + this._eventDateTime.day;
    console.log(this.clientContactMasterService.formEvent.id);
    if (this.clientContactMasterService.formEvent.id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.clientContactMasterService.postContactDetail().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientContactMasterService.refreshList();
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
    this.clientContactMasterService.putClientDetail().subscribe(
      (res: any) => {
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientContactMasterService.refreshList();
        }
        else{
          this.toastr.error("", res.message);
        }
      },
      err => {
        console.log(err);
      }
    )
  }
}
