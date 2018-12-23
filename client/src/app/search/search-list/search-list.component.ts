import {Component, Inject, OnInit} from '@angular/core';
import {Page, Playlist, Singer, Song} from "../../../model";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SongService} from "../../../service/song.service";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  query: string = '';
  downloadSongURL: string = this.host + '/api/files/';

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private router: ActivatedRoute,
              private routerL: Router,
              @Inject('HOST') private host: string) {
  }

  ngOnInit() {
    this.router
      .paramMap
      .subscribe((param: ParamMap) => {
        this.query = param.get('q');
        if (this.query != null || this.query != '') {
          this.songService
            .getSongsByName(this.query, 6)
            .subscribe(resp => {
              this.songPage = resp
            });
          this.playlistService
          //.getAllPlaylist(3)
            .getPlaylistByName(this.query, 3)
            .subscribe(resp => {
              this.playlistPage = resp

            })
        }
      })
  }

  songPage: Page<Song>;

  /** playlist **/
  songForPlaylist: number;
  playlistPage: Page<Playlist>;

  addToPlayList(songId: number) {
    if (this.songForPlaylist == songId) {
      this.songForPlaylist = 0;
    } else {
      this.songForPlaylist = songId
    }
  }

  toMusicPage(id: number) {
    this.routerL.navigate(['/music/' + id]);
    window.scroll(0, 0);
  }
}
