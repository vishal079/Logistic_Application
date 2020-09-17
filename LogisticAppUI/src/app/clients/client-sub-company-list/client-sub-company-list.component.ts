import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ClientSubCompanyMasterService } from 'src/app/_services/client-sub-company-master.service';

@Component({
  selector: 'app-client-sub-company-list',
  templateUrl: './client-sub-company-list.component.html',
  styles: []
})
export class ClientSubCompanyListComponent implements OnInit {

  clientId = '';
  companyId = '';
  constructor(private http: HttpClient, public clientSubCompanyService: ClientSubCompanyMasterService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clientSubCompanyService.bindParentCompanys()
  }

  inActiveClient(event, clientId) {
    if (confirm("Are you sure you want to delete the company?")) {
      this.clientSubCompanyService.deleteSubCompany(clientId).subscribe(
        (res: any) => {
          if (res.message == 'Client company deleted successfully') {
            this.toastr.success("", res.message);
            this.clientSubCompanyService.refreshList();
          }
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  bindClient(event, clientId) {
    alert('edit called');
    // this.clientService.getAllClients(clientId).subscribe(
    //   (res: any) => {
    //     if (res.message == 'Client deleted successfully') {
    //       this.toastr.success("", "Client Removed Successfully!");
    //       this.clientService.refreshList();
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
  }

  onParentCompanyChange(client_id) {
    this.clientSubCompanyService.getAllSubCompany(client_id);
  }

  openResetPasswordModel(company) {
    this.clientId = company.client_id;
    this.companyId = company.id;
  }
}
