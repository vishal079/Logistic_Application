import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientMasterService } from 'src/app/_services/client-master.service';
import { ToastrService } from 'ngx-toastr';
import { ClientMasterComponent } from '../client-master/client-master.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
//import { EventMasterService } from 'src/app/_services/event-master.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styles: []
})
export class ClientListComponent implements OnInit {
  resetPassword: FormGroup;
  client_id: string = "";
  manage_client_popup_name = "Add Client";
  is_edit: boolean = false;

  constructor(private http: HttpClient, public clientService: ClientMasterService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clientService.getAllClients();
  }

  inActiveClient(event, clientId) {
    if (confirm("Are you sure you want to delete client?")) {
      this.clientService.deleteEventDetail(clientId).subscribe(
        (res: any) => {
          if (res.message == 'Client deleted successfully') {
            this.toastr.success("", "Client Removed Successfully!");
            this.clientService.refreshList();
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  bindClient(event, objClient) {
    debugger;
    this.is_edit = true;
    this.clientService.formEvent = {
      Id: objClient.id,
      name: objClient.name,
      email: objClient.email,
      phone: objClient.phone,
      password: objClient.password,
      line1: objClient.line1,
      line2: objClient.line2,
      city: objClient.city,
      state: objClient.state,
      country: objClient.country,
      postal_code: objClient.postal_code,
      Description: objClient.description,
      ClientType: 0,
      CreatedBy: "",
      CreatedDate: "",
      UpdatedBy: "",
      UpdatedDate: ""
    };
    this.manage_client_popup_name = "Edit Client";
    //document.getElementById("openModalButton").click();
  }

  createClient(e) {
    this.is_edit = false;
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
    this.manage_client_popup_name = "Add Client";
  }

  openResetPasswordModel(client) {
    this.client_id = client.id;
  }
}
