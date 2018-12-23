import {Inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject('HOST') private host) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    let headersContent = new HttpHeaders();
    headersContent.append('Content-Type', 'application/x-www-form-urlencoded');
    headersContent.append('Authorization', 'Basic ' + window.btoa('devglan-client:devglan-secret'));

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    console.log('attempAuth ::');
    return this.http.post<any>(this.host, body, {headers: headersContent});
  }
}
