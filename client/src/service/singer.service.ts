import { Injectable, Inject } from "@angular/core";
import {Song, Page, SongForm, Singer} from "../model"
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {from, observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SingerService{
  constructor(
    @Inject('HOST') private host:string,
    private http: HttpClient){
  }

  getSingers(singerName:string,size: number,page = 0): Observable<Page<Singer>>{
    return this.http
      .get<Page<Singer>>(this.host+'/api/singers/search/name?q='+singerName+'&size='+size+'&page='+page+'&sort=name')

  }
}
