import { Component, OnInit } from '@angular/core';
import { ClientAddressMasterService } from '../_services/client-address-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client-address',
  templateUrl: './list-client-address.component.html',
  styles: []
})
export class ListClientAddressComponent implements OnInit {

  constructor(public clientAddressMasterService: ClientAddressMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.clientAddressMasterService.getAllClientAddress();
  }

  bindAddress(event, objAddress) {
    debugger;
    this.clientAddressMasterService.formEvent.id = objAddress.id;
    this.clientAddressMasterService.formEvent.line1 = objAddress.line1;
    this.clientAddressMasterService.formEvent.line2 = objAddress.line2;
    this.clientAddressMasterService.formEvent.postal_code = objAddress.postal_code;
    this.clientAddressMasterService.formEvent.city = objAddress.city;
    this.clientAddressMasterService.formEvent.state = objAddress.state;
    this.clientAddressMasterService.formEvent.country = objAddress.country;
    this.clientAddressMasterService.formEvent.phone = objAddress.phone;
    //document.getElementById("openModalButton").click();
  }

  inActiveAddress(e, clientId, AddressId, name) {
    if (confirm("Are you sure you want to delete Address?")) {
      this.clientAddressMasterService.deleteAddressDetail(clientId, AddressId).subscribe(
        (res: any) => {
          if (res.status) {
            this.toastr.success("", res.message);
            this.clientAddressMasterService.refreshList();
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

  createAddress(e) {
    this.clientAddressMasterService.formEvent = {
      id: 0,
      company_id: localStorage.getItem('company_id'),
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

}
