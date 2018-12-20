import { Injectable, Inject } from "@angular/core";
import {Song, Page, SongForm} from "../model"
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {from, observable, Observable} from 'rxjs';

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

  getSongsByName(name: string, size: number): Observable<Page<Song>>{
    return this.http.get<Page<Song>>(this.host+'/api/songs/search/name?q='+name+'&size='+size+'&page=0&sort=name');
  }

  getSongsAndSortByDESC(size: number,page:number = 0): Observable<Page<Song>>{
    return from(this.http
      .get<Page<Song>>(this.host+'/api/songs?sort=views,desc&size='+size+'&page='+page));
  }

  getSongByGene(id:number,size: number,page:number = 0):Observable<Page<Song>>{
    return this.http.get<Page<Song>>(this.host+'/api/songs/search/gene?q='+id+'&sort=views,desc&size='+size+'&page='+page)
  }

  uploadSong(song:SongForm,file:File):Observable<Song>{
    const header:HttpHeaders = new HttpHeaders();
    header.append('Content-Type',undefined);

    let formData:FormData = new FormData();
    formData.append('file',file,this.fileNameHanlde(file.name));
    return from(
    this.http
      .post(this.host+'/api/files',formData,{
        observe:'response',
        headers: header
      })
      .toPromise()
      .then((response)=>{
        if (response.status == 201){
          song.link = response.body[0];
          console.log(song.link);
          return song;
        }
        return null;
      })
      .then((song)=>{
        return this.http
          .post(this.host+'/api/songs',song,{
            observe:'response'
          })
          .toPromise()
          .then(async response =>{
            if (response.status == 201) {
              return response.body as Song;
            }
            await this.http
              .delete(this.host+'/api/files/'+song.link,{observe:'response'})
              .toPromise()
              .then(response => {console.log(response)});
            return null;
          })
      }));
  }
  private fileNameHanlde(fileName:string = '',complexity:number =1){
    const type = fileName.split('.').pop();
    let name = '';
    for (let i =0; i<complexity;i++){
      name+= Math.random().toString().split('.').pop();
    }
    return name +'.'+ type;
  }
}
