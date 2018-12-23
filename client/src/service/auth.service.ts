import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('HOST') private host) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const url = this.host + "/oauth/token";
    let headersContent: HttpHeaders = new HttpHeaders({Authorization: 'Basic ' + window.btoa('devglan-client:devglan-secret')});
    console.log(headersContent);
    const body = new HttpParams()
      .set('username', "admin")
      .set('password', "admin")
      .set('grant_type', 'password');
    console.log(body);
    console.log('attempAuth ::');
    return this.http.post<any>(url, body, {headers: headersContent});
  }
}
