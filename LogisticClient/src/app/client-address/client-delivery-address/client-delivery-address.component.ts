import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientAddressMasterService } from 'src/app/_services/client-address-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-delivery-address',
  templateUrl: './client-delivery-address.component.html',
  styles: []
})
export class ClientDeliveryAddressComponent implements OnInit {

  constructor(public clientAddressMasterService: ClientAddressMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.resetForm()
    }
    this.clientAddressMasterService.formEventDeliveryAddress = {
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
    console.log(this.clientAddressMasterService.formEventDeliveryAddress.id);
    if (this.clientAddressMasterService.formEventDeliveryAddress.id === 0) {
      this.insertRecord(form);
    }
    else {
      this.updateRecord(form);
    }
  }

  insertRecord(form: NgForm) {
    this.clientAddressMasterService.postDeliveryAddressDetail().subscribe(
      (res: any) => {
        console.log(res);
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientAddressMasterService.refreshDeliveryAddressList();
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

  updateRecord(form: NgForm) {
    this.clientAddressMasterService.putDeliveryAddressDetail().subscribe(
      (res: any) => {
        if (res.status) {
          this.resetForm(form);
          this.toastr.success("", res.message);
          this.clientAddressMasterService.refreshDeliveryAddressList();
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
