import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';
import { ClientJobMasterService } from '../_services/client-job-master.service';

@Component({
  selector: 'app-report-job',
  templateUrl: './report-job.component.html',
  styles: []
})
export class ReportJobComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  _FilterDeliveryDate: any;
  _FilterStatus: any = -1;
  _filterClient: any = "";

  constructor(private http: HttpClient, public clientService: ClientJobMasterService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.clientService.getAllClientJobs(null, null);
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    XLSX.writeFile(wb, 'JobReport_' + dateString + '.xlsx');
  }

  FilterJobs() {
    debugger;
    var deliveryDate = "";
    if (this._FilterDeliveryDate != null && typeof (this._FilterDeliveryDate) != "undefined") {
      deliveryDate = this._FilterDeliveryDate.year + '-' + this._FilterDeliveryDate.month + '-' + this._FilterDeliveryDate.day;
    }
    var status = null;
    if (parseInt(this._FilterStatus) > -1)
      status = (parseInt(this._FilterStatus) - 1).toString();
    //status = (status < 0) ? null : status;
    this.clientService.getAllClientJobs(status, deliveryDate);
  }

  ClearFilter() {
    this._FilterDeliveryDate = ""
    this._FilterStatus = -1;
    this._filterClient = "";
    this.clientService.getAllClientJobs(null, null);
  }
}
