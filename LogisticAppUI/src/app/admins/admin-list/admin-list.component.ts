import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminMasterService } from 'src/app/_services/admin-master.service';
import { ToastrService } from 'ngx-toastr';
import { AdminMasterComponent } from '../admin-master/admin-master.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { EventMasterService } from 'src/app/_services/event-master.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styles: []
})
export class AdminListComponent implements OnInit {
  resetPassword: FormGroup;
  admin_id = '';
  manage_admin_popup_name = 'Add Admin';
  is_edit = false;

  constructor(private http: HttpClient, public adminService: AdminMasterService, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.adminService.getAllAdmins();
  }

  inActiveAdmin(event, adminId) {
    if (confirm('Are you sure you want to delete admin?')) {
      this.adminService.deleteEventDetail(adminId).subscribe(
        (res: any) => {
          if (res.message == 'Admin deleted successfully') {
            this.toastr.success('', 'Admin Removed Successfully!');
            this.adminService.refreshList();
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  bindAdmin(event, objAdmin) {
    this.is_edit = true;
    this.adminService.formEvent = {
      Id: objAdmin.id,
      name: objAdmin.name,
      email: objAdmin.email,
      phone: objAdmin.phone,
      password: objAdmin.password,
      AdminType: 0,
      CreatedBy: '',
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: ''
    };
    this.manage_admin_popup_name = 'Edit Admin';
    // document.getElementById("openModalButton").click();
  }

  createAdmin(e) {
    this.is_edit = false;
    this.adminService.formEvent = {
      Id: 0,
      name: '',
      email: '',
      phone: '',
      password: '',
      AdminType: 0,
      CreatedBy: '',
      CreatedDate: '',
      UpdatedBy: '',
      UpdatedDate: ''
    };
    this.manage_admin_popup_name = 'Add Admin';
  }

  openResetPasswordModel(admin) {
    this.admin_id = admin.id;
  }
}
