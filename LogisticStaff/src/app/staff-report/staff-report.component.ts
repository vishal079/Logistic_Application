import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ManageJobService } from '../_services/manage-job.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staff-report',
  templateUrl: './staff-report.component.html',
  styles: []
})
export class StaffReportComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  
  constructor(public manageJobService: ManageJobService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.manageJobService.bindAssignedJobs(null, null);
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    XLSX.writeFile(wb, 'JobDelivery_' + dateString + '.xlsx');
  }
}
