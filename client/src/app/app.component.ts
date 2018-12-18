import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  file: File;

  constructor(private http: HttpClient) {
  }

  append(files: FileList) {
    this.file = files.item(0);
    console.log(this.file);
  }

  submit() {
    let formdata = new FormData();
    formdata.append("files", this.file);
    formdata.append("content",JSON.stringify({
      name:"toandz"
    }));
    console.log(formdata);
    let header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', undefined);
    this.http.post("http://localhost:8080/api/files", formdata, {
      observe: 'response',
      headers: header
    }).subscribe(
      (resp) => console.log(resp)
    );
  }
}
