import { Component, OnInit } from '@angular/core';
import { ClientJobMasterService } from '../_services/client-job-master.service';

@Component({
  selector: 'app-client-sub-company-list',
  templateUrl: './client-sub-company-list.component.html',
  styles: []
})
export class ClientSubCompanyListComponent implements OnInit {

  clientId = '';
  companyId = '';
  constructor(
    public clientJobService: ClientJobMasterService) {
  }

  ngOnInit() {
    this.clientJobService.getAllSubCompany(localStorage.getItem('client_id'));
  }

  openResetPasswordModel(company) {
    this.clientId = company.client_id;
    this.companyId = company.id;
  }
}
