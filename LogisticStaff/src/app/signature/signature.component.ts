import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styles: []
})
export class SignatureComponent implements OnInit {

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

  savePng() {
    debugger;
    const data = this.signaturePad.toDataURL();

    const formData = new FormData();
    formData.append('file', data);
    this.httpClient.post('http://127.0.0.1:8088/api/staff/add/job_image', formData)
      .subscribe(res => {
        debugger;
        console.log(res);
        alert('SUCCESS !!');
      })
    // console.log(data);
    // const endpoint = '/api/staff/add/job_image';
    // const formData: FormData = new FormData();
    // formData.append('fileKey', this.fileToUpload, this.fileToUpload.name);
    // return this.httpClient
    //   .post(endpoint, formData)
    //   .map((res: any) => { return true; })
    //   .catch((e) => this.handleError(e));
    //this.http.post(this.eventRootURL + '/api/staff/add/job_image', data);
    //.post(endpoint, formData, { headers: yourHeadersConfig })
  }

  // createContrat(fileToUpload: File, newContrat: Contrat): Observable<boolean> 
  // { 
  //   let headers = new Headers(); 
  //   const endpoint = Api.getUrl(Api.URLS.createContrat)); 
  //   const formData: FormData = new FormData(); 
  //   formData.append('fileKey', fileToUpload, FileToUpload.name); 
  //   let body newContrat.gup(this.auth.getCurrentUser().token); 
  //   return this.http.post(endpoint, formData, body).map(() => { return true; }) 
  // }

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
