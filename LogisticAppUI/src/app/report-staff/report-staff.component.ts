import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StaffMasterService } from '../_services/staff-master.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-staff',
  templateUrl: './report-staff.component.html',
  styles: []
})
export class ReportStaffComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;
  constructor(private http: HttpClient, public staffService: StaffMasterService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.staffService.getAllStaffMember()
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    XLSX.writeFile(wb, 'StaffReport_' + dateString + '.xlsx');
  }

}
