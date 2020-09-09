import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styles: []
})
export class AdminProfileComponent implements OnInit {

  AdminName: any;
  AdminEmail:any;
  AdminPhone:any;
  constructor() { }

  ngOnInit() {
    this.AdminName = localStorage.getItem("adminName");
    this.AdminEmail = localStorage.getItem("adminEmail");
    this.AdminPhone = localStorage.getItem("adminPhone");
  }
}
