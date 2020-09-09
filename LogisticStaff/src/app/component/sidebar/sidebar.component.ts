import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public appComponant: AppComponent) { }

  ngOnInit() {
  }

  status: boolean = false;
  clickToggleSidebar() {
    this.status = !this.status;
  }

}
