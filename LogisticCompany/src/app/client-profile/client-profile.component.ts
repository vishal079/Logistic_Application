import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styles: []
})
export class ClientProfileComponent implements OnInit {

  CompanyProfile: any
  constructor() { }

  ngOnInit() {
    debugger;
    this.CompanyProfile = JSON.parse(localStorage.getItem("CompanyProfile"));
  }

}
