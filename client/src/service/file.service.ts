import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = 'http://localhost:8080/api/files';

  upload(files: FileList, multiFile: boolean = true): Observable<any> {
    const formData: FormData = new FormData();
    if (multiFile) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files.item(i))
      }
    } else {
      formData.append('file', files.item(0));
    }
    const header: HttpHeaders = new HttpHeaders();
    header.append('Content-Type', undefined);
    return this.httpClient.post(this.url, formData, {
      observe: 'response',
      headers: header
    })
  }

  constructor(private httpClient: HttpClient) {
  }
}