import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload-test',
  templateUrl: './image-upload-test.component.html',
  styles: []
})
export class ImageUploadTestComponent implements OnInit {


  constructor(private http: HttpClient) { }
  ngOnInit() {
  }

  fileData = null;


  fileProgress(fileInput: any) {
    debugger;
    // this.fileData = <File>fileInput.target.files[0];
    this.fileData = <File>fileInput[0];
  }

  onSubmit() {
    debugger;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.http.post('http://127.0.0.1:8088/api/staff/add/job_image', formData)
      .subscribe(res => {
        debugger;
        console.log(res);
        alert('SUCCESS !!');
      })
  }

}
