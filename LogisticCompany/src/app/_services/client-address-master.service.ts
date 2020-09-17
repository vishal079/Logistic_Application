import { Injectable } from '@angular/core';
import { clientAddresstMaster, clientDeliveryAddresstMaster } from '../_models/client-address-master.module';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ClientAddressMasterService {

  formEvent: clientAddresstMaster;
  listClientAddress: object;

  //Delivery Address Details
  formEventDeliveryAddress: clientDeliveryAddresstMaster;
  listClientDeliveryAddress: object;

  readonly eventRootURL = environment.baseUrl;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  postAddressDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/create/address', formData);
  }

  putAddressDetail() {
    let formData: FormData = this.CreateFormData();
    return this.http.post(this.eventRootURL + '/api/client/update/address', formData);
  }

  private CreateFormData(): FormData {
    let formData: FormData = new FormData();
    formData.append('address_id', this.formEvent.id.toString());
    formData.append('company_id', this.formEvent.company_id);
    formData.append('line1', this.formEvent.line1);
    formData.append('line2', this.formEvent.line2);
    formData.append('phone', this.formEvent.phone);
    formData.append('postal_code', this.formEvent.postal_code);
    formData.append('city', this.formEvent.city);
    formData.append('state', this.formEvent.state);
    formData.append('country', this.formEvent.country);
    return formData;
  }

  deleteAddressDetail(id, personId) {
    let formData: FormData = new FormData();
    formData.append('company_id', id);
    formData.append('address_id', personId);
    return this.http.post(this.eventRootURL + '/api/client/delete/address', formData);
  }

  refreshList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/address', null).toPromise()
      .then((res: any) => {
        this.listClientAddress = res.data;
        this.spinner.hide();
      })
  }

  getAllClientAddress() {
    debugger;
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/address', null).toPromise()
      .then((res: any) => {
        debugger;
        this.listClientAddress = res.data;
        this.spinner.hide();
      })
  };


  // Delivery Address Details
  private CreateDeliveryAddressFormData(): FormData {
    let formData: FormData = new FormData();
    formData.append('address_id', this.formEventDeliveryAddress.id.toString());
    formData.append('company_id', this.formEventDeliveryAddress.company_id);
    formData.append('line1', this.formEventDeliveryAddress.line1);
    formData.append('line2', this.formEventDeliveryAddress.line2);
    formData.append('phone', this.formEventDeliveryAddress.phone);
    formData.append('postal_code', this.formEventDeliveryAddress.postal_code);
    formData.append('city', this.formEventDeliveryAddress.city);
    formData.append('state', this.formEventDeliveryAddress.state);
    formData.append('country', this.formEventDeliveryAddress.country);
    return formData;
  }

  postDeliveryAddressDetail() {
    let formData: FormData = this.CreateDeliveryAddressFormData();
    return this.http.post(this.eventRootURL + '/api/client/create/deliveryAddress', formData);
  }

  putDeliveryAddressDetail() {
    let formData: FormData = this.CreateDeliveryAddressFormData();
    return this.http.post(this.eventRootURL + '/api/client/update/deliveryAddress', formData);
  }

  deleteDeliveryAddressDetail(clientId, addressId) {
    let formData: FormData = new FormData();
    formData.append('company_id', clientId);
    formData.append('address_id', addressId);
    return this.http.post(this.eventRootURL + '/api/client/delete/deliveryAddress', formData);
  }

  refreshDeliveryAddressList() {
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/deliveryAddress', null).toPromise()
      .then((res: any) => {
        this.listClientDeliveryAddress = res.data;
        this.spinner.hide();
      })
  }

  getAllClientDeliveryAddress() {
    debugger;
    this.spinner.show();
    this.http.post(this.eventRootURL + '/api/client/get/deliveryAddress', null).toPromise()
      .then((res: any) => {
        debugger;
        this.listClientDeliveryAddress = res.data;
        this.spinner.hide();
      })
  };

}
