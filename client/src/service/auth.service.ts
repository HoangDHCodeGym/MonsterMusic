import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/form-data');

    return this.http.post<any>('http://localhost:8080/api/token', fd, {headers: headers});
    // const credentials = {username: ussername, password: password};
    // console.log('attempAuth ::');
    // return this.http.post<any>('http://localhost:8080/api/token', credentials);
  }
}
