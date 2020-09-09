import { Component, OnInit } from '@angular/core';
import { DashboardMasterService } from '../_services/dashboard-master.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  filterType: any = "0";

  constructor(private spinner: NgxSpinnerService, public dashboardService: DashboardMasterService) { }

  ngOnInit() {
    var startDate = null;
    var endDate = null;
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date();
    endDate.setHours(23, 59, 59, 0);
    this.bindDashboard(startDate, endDate);
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public mbarChartLabels: string[] = ['Today'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#f6c23e',
      borderColor: '#f6c23e',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: '#3765ee',
      borderColor: '#3765ee',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    },
    {
      backgroundColor: '#318d6b',
      borderColor: '#318d6b',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    },
    {
      backgroundColor: '#e74a3b',
      borderColor: '#e74a3b',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
  
  public barChartData: any[] = [
    { data: [0], label: 'Pending' },
    { data: [0], label: 'Pickedup' },
    { data: [0], label: 'Delivered' },
    { data: [0], label: 'Cancelled' }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    let data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100)];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

  FilterDashboard() {
    var startDate = null;
    var endDate = null;

    if (this.filterType == 0) {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date();
      endDate.setHours(23, 59, 59, 0);
      this.bindDashboard(this.formatDate(startDate), this.formatDate(endDate));
    }
    else if (this.filterType == 1) {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.bindDashboard(this.formatDate(firstDay), this.formatDate(lastDay));
      this.mbarChartLabels = ['Month'];
    }
    else if (this.filterType == 2) {
      var date = new Date();
      var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.bindDashboard("1900-01-01", this.formatDate(lastDay));
      this.mbarChartLabels = ['Till Date'];
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  bindDashboard(startDate, endDate) {
    this.dashboardService.bindDashboardNew(this.formatDate(startDate), this.formatDate(endDate)).subscribe(
      (res: any) => {
        debugger;
        this.dashboardService.totalClient = res.data.totalClient;
        this.dashboardService.totalStaff = res.data.totalStaff;
        this.dashboardService.totalVehicle = res.data.totalVehicle;
        this.dashboardService.totalWaiting = res.data.totalWaiting;
        this.dashboardService.totalAssigned = res.data.totalAssigned;
        this.dashboardService.totalPicked = res.data.totalPicked;
        this.dashboardService.totalPartiallyDelivered = res.data.totalPartiallyDelivered;
        this.dashboardService.totalDelivered = res.data.totalDelivered;
        this.dashboardService.totalCancelled = res.data.totalCancelled;
        this.spinner.hide();
        this.barChartData = [{ data: [this.dashboardService.totalWaiting], label: 'Pending' },
        { data: [this.dashboardService.totalPicked], label: 'Pickedup' },
        { data: [this.dashboardService.totalDelivered], label: 'Delivered' },
        { data: [this.dashboardService.totalCancelled], label: 'Cancelled' }]
      });
  }
}
