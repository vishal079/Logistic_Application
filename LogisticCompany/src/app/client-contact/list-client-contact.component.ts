import { Component, OnInit } from '@angular/core';
import { ClientContactMasterService } from '../_services/client-contact-master.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-client-contact',
  templateUrl: './list-client-contact.component.html',
  styles: []
})
export class ListClientContactComponent implements OnInit {

  constructor(public clientContactMasterService: ClientContactMasterService, private toastr: ToastrService) { }

  ngOnInit() {
    this.clientContactMasterService.getAllClientContacts();
  }

  bindContact(event, objContact) {
    this.clientContactMasterService.formEvent.id = objContact.id;
    this.clientContactMasterService.formEvent.name = objContact.name;
    this.clientContactMasterService.formEvent.designation = objContact.designation;
    this.clientContactMasterService.formEvent.phone = objContact.phone;
    this.clientContactMasterService.formEvent.email = objContact.email;
    document.getElementById("openModalButton").click();
  }

  inActiveContact(e, clientId, personId, contactName) {
    if (confirm("Are you sure you want to delete contact : " + contactName + "?")) {
      this.clientContactMasterService.deleteContactDetail(clientId, personId).subscribe(
        (res: any) => {
          if (res.status) {
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
}
