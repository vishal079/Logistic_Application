import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  readonly eventRootURL = environment.baseUrl;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }
}
