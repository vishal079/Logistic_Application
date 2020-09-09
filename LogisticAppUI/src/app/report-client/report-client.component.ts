import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientMasterService } from '../_services/client-master.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-client',
  templateUrl: './report-client.component.html',
  styles: []
})
export class ReportClientComponent implements OnInit {

  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  constructor(private http: HttpClient, public clientService: ClientMasterService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.clientService.getAllClients();
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var date = new Date();
    var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
    XLSX.writeFile(wb, 'ClientReport_' + dateString + '.xlsx');
  }
}
