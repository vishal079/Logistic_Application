import { Component, OnInit } from '@angular/core';
import { ClientAddressMasterService } from 'src/app/_services/client-address-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client-delivery-address',
  templateUrl: './list-client-delivery-address.component.html',
  styles: []
})
export class ListClientDeliveryAddressComponent implements OnInit {

  constructor(public clientAddressMasterService: ClientAddressMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.clientAddressMasterService.getAllClientDeliveryAddress();
  }

  bindAddress(event, objAddress) {
    debugger;
    this.clientAddressMasterService.formEventDeliveryAddress.id = objAddress.id;
    this.clientAddressMasterService.formEventDeliveryAddress.line1 = objAddress.line1;
    this.clientAddressMasterService.formEventDeliveryAddress.line2 = objAddress.line2;
    this.clientAddressMasterService.formEventDeliveryAddress.postal_code = objAddress.postal_code;
    this.clientAddressMasterService.formEventDeliveryAddress.city = objAddress.city;
    this.clientAddressMasterService.formEventDeliveryAddress.state = objAddress.state;
    this.clientAddressMasterService.formEventDeliveryAddress.country = objAddress.country;
    this.clientAddressMasterService.formEventDeliveryAddress.phone = objAddress.phone;
  }

  inActiveAddress(e, clientId, AddressId, name) {
    if (confirm("Are you sure you want to delete Address?")) {
      this.clientAddressMasterService.deleteDeliveryAddressDetail(clientId, AddressId).subscribe(
        (res: any) => {
          debugger;
          if (res.status) {
            this.toastr.success("", res.message);
            this.clientAddressMasterService.refreshDeliveryAddressList();
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
    this.clientAddressMasterService.formEventDeliveryAddress = {
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
