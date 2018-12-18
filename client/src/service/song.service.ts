import { Injectable, Inject } from "@angular/core";
import { Song, Page } from "../model"
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SongService{
  constructor(
    @Inject('HOST') private host:string,
    private http: HttpClient){
  }

  getSongById(id: number): Observable<Song> {
    const url = `${this.host}/song/${id}`;
    return this.http.get<Song>(url);
  }

  getSongs(): Observable<Page<Song>> {
    console.log(this.host+'/api/songs');
    return this.http.get<Page<Song>>(this.host+'/api/songs');
  }
}