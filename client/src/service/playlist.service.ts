import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Page, Playlist, PlaylistForm} from "../model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  addSong(songId: number, playlistId: number): Observable<number> {
    return this.httpClient
      .patch(this.host + '/api/playlists/' + playlistId, {songList: [songId]}, {observe: 'response'})
      .pipe(map(response => response.status));
  }

  createPlaylist(playlist: PlaylistForm): Observable<Playlist> {
    return this.httpClient
      .post(this.host + '/api/playlists', playlist, {observe: 'response'})
      .pipe(map(response => {
        if (response.status == 201) {
          return response.body as Playlist
        }
        return null;
      }))
  }

  getAllPlaylist(size: number, page: number = 0): Observable<Page<Playlist>> {
    return this.httpClient
      .get(this.host + '/api/playlists?sort=views,desc&size=' + size + '&page=' + page, {observe: 'response'})
      .pipe(map(response => {
        if (response.status == 200) {
          return response.body as Page<Playlist>;
        }
        return null;
      }))
  }


  constructor(@Inject('HOST') private host: string,
              private httpClient: HttpClient) {
  }
}
