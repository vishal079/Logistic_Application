import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pickup-job',
  templateUrl: './pickup-job.component.html',
  styles: []
})
export class PickupJobComponent implements OnInit {

  imageSrc: string[];
  readonly eventRootURL = environment.baseUrl;
  fileToUpload: File = null;

  @ViewChild('signaturePad', { static: false }) signaturePad;

  width: number = 400;
  height: number = 200;
  options: any = null;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  clear() {
    console.log('clear');
    this.signaturePad.clear();
  }

  readURL(event: Event): void {
    debugger;
    if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
      for (let index = 0; index < (<HTMLInputElement>event.target).files.length; index++) {
        //const file = (<HTMLInputElement>event.target).files[index];
        const file = (<HTMLInputElement>event.target).files[0];
        var imagePath = ""
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);
        reader.onload = e => imagePath = reader.result.toString();
        debugger;
        this.imageSrc.push(imagePath);
        //reader.readAsDataURL(file);
      }
    }
  }
}
