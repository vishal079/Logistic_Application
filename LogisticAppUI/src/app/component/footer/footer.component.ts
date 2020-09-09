import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {
  CurrentDate = new Date();
  CurrYear;
  constructor() { }

  ngOnInit() {
    this.CurrYear = this.CurrentDate.getFullYear(); 
  }

}
