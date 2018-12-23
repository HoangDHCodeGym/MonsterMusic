import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SongService} from "../../../service/song.service";
import * as $ from 'jquery';
import {Page, Playlist, Song, SongForm} from "../../../model";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  songId: number;
  songGene: string;
  songViews: number;
  songDate: string;
  songTitle: string;
  songSinger: string;
  singerId: number;
  songDuration: string = '0:00';
  currentSongURL: string = '';
  downloadSongURL: string = '';
  songList: Array<Song>;
  audio: HTMLAudioElement;
  interval;

  static timeConverter(time: number): string {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return minutes + ':' + seconds;
  }

  constructor(private router: ActivatedRoute,
              private routerL: Router,
              @Inject('HOST') private host,
              private songService: SongService,
              private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.downloadSongURL = this.host + '/api/files/';
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.songId = Number(paramMap.get('id'));
      this.resolveSongResourceUrl();
    });
  }

  resolveSongResourceUrl() {
    this.songService
      .getSongById(this.songId)
      .subscribe((song) => {
        this.reset();
        this.currentSongURL = this.host + '/api/files/' + song.link;
        this.audio = new Audio(this.currentSongURL);
        this.songDate = song.createdDate.slice(0, 10);
        this.songTitle = song.name;
        this.songSinger = (song.singer != null) ? song.singer.name : null;
        this.singerId = (song.singer != null) ? song.singer.id : 0;
        this.songViews = song.views;
        this.songGene = song.gene.name;
        this.getSongList(this.singerId);
        this.clickPlayBtn();
        //xin 1 slot cho playlist nhé :>
        this.getPlaylistList()
      })
  }

  getSongList(singerId: number): void {
    if (singerId <= 0) {
      this.songService
        .getSongs(5)
        .subscribe((songPage) => {
            this.songList = songPage.content;
          }
        );
    } else {
      this.songService
        .getSongsBySinger_Id(singerId, 5)
        .subscribe((songPage) => {
          this.songList = songPage.content;
        })
    }
  }

  clickPlayBtn(): void {
    const playBtn = $('#playBtn');
    if (playBtn.hasClass('fa-play')) {
      this.audio.play();
      playBtn.addClass('fa-pause');
      playBtn.removeClass('fa-play');
      this.setCounter();
    } else {
      this.audio.pause();
      playBtn.addClass('fa-play');
      playBtn.removeClass('fa-pause');
    }
  }

  setCounter(): void {
    const audio = this.audio;
    const self = this;
    this.interval = setInterval(function () {
      self.songDuration = PlayerComponent.timeConverter(audio.duration);
      $('#running_time').text(PlayerComponent.timeConverter(audio.currentTime));
      $('#timeLine').val(Math.floor(audio.currentTime / audio.duration * 100));
      if (audio.currentTime === audio.duration) {
        clearInterval(self.interval);
        self.clickPlayBtn();
      }
    }, 1000);
  }

  skipTo(timeLineValue: number): void {
    this.audio.pause();
    this.audio.currentTime = Math.floor(this.audio.duration * timeLineValue / 100);
    clearInterval(this.interval);
    this.setCounter();
    this.audio.play();
  }

  toMusicPage(id: number) {
    this.routerL.navigate(['/music/' + id]);
    window.scroll(0, 0);
  }

  downloadSong(link: string) {
    window.location.href = this.host + '/api/files/' + link;
  }

  reset(): void {
    const playBtn = $('#playBtn');
    if (this.audio) this.audio.pause();
    clearInterval(this.interval);
    playBtn.addClass('fa-play');
    playBtn.removeClass('fa-pause');
    $("#timeLine").val(0);
    $('#running_time').text('0.00');
  }

  /** this is playlist stuff **/
  songForPlaylist: number;
  playlistPage: Page<Playlist>;

  addToPlayList(songId: number) {
    if (this.songForPlaylist == songId) {
      this.songForPlaylist = 0;
    } else {
      this.songForPlaylist = songId
    }
  }

  getPlaylistList() {
    this.playlistService
      .getAllPlaylist(3)
      .subscribe(page => {
        this.playlistPage = page;
      })
  }

}
