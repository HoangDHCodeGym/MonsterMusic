import { Injectable, Inject } from "@angular/core";
import { Song, Page } from "../model"
import { HttpClient } from "@angular/common/http";
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SongService{
  constructor(
    @Inject('HOST') private host:string,
    private http: HttpClient){
  }

  getSongById(id: number): Observable<Song> {
    const url = this.host+'/api/songs/'+id;
    return this.http.get<Song>(url);
  }

  getSongs(): Observable<Page<Song>> {
    console.log(this.host+'/api/songs');
    return this.http.get<Page<Song>>(this.host+'/api/songs');
  }

  getSongsAndSortByDESC(size: number,page:number = 0): Observable<Page<Song>>{
    return from(this.http
      .get<Page<Song>>(this.host+'/api/songs?sort=views,desc&size='+size+'&page='+page));

  }
}
