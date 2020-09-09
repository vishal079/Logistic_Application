import { Component, OnInit } from '@angular/core';
import { $ } from 'jquery';
//import * as $ from 'node_modules/startbootstrap-sb-admin-2/vendor/jquery/jquery.min.js';
import { Router, NavigationEnd, ActivatedRoute, RoutesRecognized } from '@angular/router';

declare const DrawAreaChart: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'LogisticUI';
  showHeader = false;
  showSidebar = false;
  showFooter = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        //debugger;
        this.showHeader = this.activatedRoute.firstChild.snapshot.data.showHeader !== false;
        this.showSidebar = this.activatedRoute.firstChild.snapshot.data.showSidebar !== false;
        this.showFooter = this.activatedRoute.firstChild.snapshot.data.showFooter !== false;
      }
    });
    //DrawAreaChart();
    //DrawPieChart();
  }

  sidebarToggle() {
    //$("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  }
}
