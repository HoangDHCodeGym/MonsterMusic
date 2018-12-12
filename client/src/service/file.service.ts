import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private url = this.hostUrl + '/api/files';

  upload(files: FileList, multiFile: boolean = true, header?: HttpHeaders): Observable<any> {
    const formData: FormData = new FormData();
    if (multiFile) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files.item(i))
      }
    } else {
      formData.append('file', files.item(0));
    }
    const _header: HttpHeaders = header || new HttpHeaders();
    _header.append('Content-Type', undefined);
    return this.httpClient.post(this.url, formData, {
      observe: 'response',
      headers: _header
    })
  }

  delete(fileName: string) {
    fileName = fileName.replace(/^ $/g, '%20');
    console.log(fileName);
    return this.httpClient.delete(this.url + '/' + fileName, {observe: 'response'})
  }

  constructor(private httpClient: HttpClient,
              @Inject('HOST_URL') private hostUrl: string) {
  }
}
