import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientAddressMasterService } from '../_services/client-address-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.component.html',
  styles: []
})
export class ClientAddressComponent implements OnInit {

  @ViewChild('closebutton', { static: false }) closebutton;

  constructor(public clientAddressMasterService: ClientAddressMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    debugger;
    if (form != null) {
      this.resetForm()
    }
    this.clientAddressMasterService.formEvent = {
      id: 0,
      client_id: localStorage.getItem('client_id'),
      line1: "",
      line2: "",
      postal_code: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      name: ''
    };
  }

  onSubmit(form: NgForm) {
    //this.clientContactMasterService.formEvent.CreatedDate = this.clientContactMasterService.year + '-' + this.clientContactMasterService.month + '-' + this._eventDateTime.day;
    console.log(this.clientAddressMasterService.formEvent.id);
    if (this.clientAddressMasterService.formEvent.id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.clientAddressMasterService.postAddressDetail().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientAddressMasterService.refreshList();
          document.getElementById("closebutton").click();
          //this.closebutton.nativeElement.click();
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
    this.clientAddressMasterService.putAddressDetail().subscribe(
      (res: any) => {
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientAddressMasterService.refreshList();
          document.getElementById("closebutton").click();
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
