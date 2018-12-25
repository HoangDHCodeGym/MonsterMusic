import {Component, Inject, OnInit} from '@angular/core';
import {Page, PagingEngine, Playlist, Singer, Song} from "../../../model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SongService} from "../../../service/song.service";
import {CommunicateService} from "../../../service/communicate.service";

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  pageEngine: PagingEngine = new PagingEngine();
  songLoaded: boolean = false;
  query: string = '';
  downloadSongURL: string = this.host + '/api/files/';

  constructor(
    private songService: SongService,
    private router: ActivatedRoute,
    private routerL: Router,
    @Inject('HOST') private host: string,
    private communicateService: CommunicateService) {
  }

  ngOnInit() {
    this.router
      .paramMap
      .subscribe((param: ParamMap) => {
        this.pageEngine = new PagingEngine();
        this.songLoaded = false;
        this.query = param.get('q');
        if (this.query != null || this.query != '') {
          this.getSongList();
        }
      });
    this.communicateService
      .event
      .songUpdate
      .getObservable()
      .subscribe(() => {
        this.songLoaded = false;
        this.pageEngine = new PagingEngine();
        if (this.query != null || this.query != '') {
          this.getSongList();
        }
      });
  }

  getSongList() {
    this.songService
      .getSongsByName(this.query, 6, this.pageEngine.current)
      .subscribe(resp => {
        this.songPage = resp;
        this.songLoaded = true;
        this.pageEngine.totalPages = this.songPage.totalPages;
        this.pageEngine.current = this.songPage.number
      }, () => {
        this.songLoaded = true;
      });
  }

  songPage: Page<Song>;

  /** playlist **/
  songForPlaylist: number;

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

  next() {
    this.pageEngine.next();
    this.getSongList();
  }

  previous() {
    this.pageEngine.previous();
    this.getSongList();
  }
}
