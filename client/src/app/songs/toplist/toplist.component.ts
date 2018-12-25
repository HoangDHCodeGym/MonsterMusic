import {Component, Inject, Input, OnInit} from '@angular/core';
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model";
import {Router} from "@angular/router";
import {CommunicateService} from "../../../service/communicate.service";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {
  songlist: Song[] = [];
  kPopSongList: Song[] = [];
  vPopSongList: Song[] = [];
  usAndUkSongList: Song[] = [];
  downloadSongURL: string = '';

  constructor(private songService: SongService, @Inject('HOST') private host: string,
              private router: Router,
              private communicateService: CommunicateService) {
    this.communicateService
      .event
      .songUpdate
      .getObservable()
      .subscribe(() => {
        this.ngOnInit();
      })
  }

  ngOnInit() {
    this.getAllSongList();
    this.downloadSongURL = this.host + '/api/files/';
  }

  public getAllSongList() {
    this.songService.getSongsAndSortByDESC(5).subscribe(res => {
      if (res != null) {
        this.songlist = res.content
      }
    });
    this.songService.getSongByGene(1, 5).subscribe(res => {
      if (res != null) {
        this.kPopSongList = res.content
      }
    });
    this.songService.getSongByGene(2, 5).subscribe(res => {
      if (res != null) {
        this.vPopSongList = res.content
      }
    });
    this.songService.getSongByGene(3, 5).subscribe(res => {
      if (res != null) {
        this.usAndUkSongList = res.content
      }
    });
  }

  toMusicPage(id: number) {
    this.router.navigate(['music/' + id]);
    window.scroll(0, 0);
  }

  /** playlist stuff **/

  @Input('choose-playlist-input') songForPlaylist: number;

  addToPlayList(songId: number) {
    if (this.songForPlaylist == songId) {
      this.songForPlaylist = 0;
    } else {
      this.songForPlaylist = songId
    }
  }


}
