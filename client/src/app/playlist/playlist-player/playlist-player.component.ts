import {Component, Inject, OnInit} from '@angular/core';
import {Page, PagingEngine, Playlist, Singer, Song} from "../../../model";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SongService} from "../../../service/song.service";
import {PlaylistService} from "../../../service/playlist.service";
import {PlayerComponent} from "../../songs/player/player.component";
import * as $ from 'jquery';
import {SingerService} from "../../../service/singer.service";
import {CommunicateService} from "../../../service/communicate.service";

@Component({
  selector: 'app-playlist-player',
  templateUrl: './playlist-player.component.html',
  styleUrls: ['./playlist-player.component.css']
})
export class PlaylistPlayerComponent implements OnInit {
  pageEngine: PagingEngine = new PagingEngine();
  songId: number;
  playlistId: number;
  songGene: string;
  songViews: number;
  songDate: string;
  songTitle: string;
  songSinger: string;
  singerId: number;
  songDuration: string = '0:00';
  currentSongURL: string = '';
  downloadSongURL: string = '';
  songList: Song[];
  audio: HTMLAudioElement;
  interval;
  playlist: Playlist;

  static timeConverter(time: number): string {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);
    return minutes + ':' + seconds;
  }

  constructor(private router: ActivatedRoute,
              private routerL: Router,
              @Inject('HOST') private host,
              private songService: SongService,
              private playlistService: PlaylistService,
              private singerService: SingerService,
              private communicateService: CommunicateService) {
  }

  ngOnInit() {
    this.downloadSongURL = this.host + '/api/files/';
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      this.songId = Number(paramMap.get('mid'));
      this.playlistId = Number(paramMap.get('pid'));
      this.pageEngine = new PagingEngine();
      this.getPlaylist();
      this.resolveSongResourceUrl();
    });
    this.communicateService
      .event
      .songUpdate
      .getObservable()
      .subscribe(() => {
        this.pageEngine = new PagingEngine();
        this.getPlaylist();
        this.resolveSongResourceUrl();
      });
  }

  ngOnDestroy() {
    this.reset();
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
        this.getPlaylistSongList(this.playlistId);
        this.clickPlayBtn();
        //xin 1 slot cho playlist nhé :>
        this.getSingerList()
      })
  }

  getPlaylistSongList(playlistId: number): void {
    this.songService
      .getSongsByPlaylist_Id(playlistId, 5, this.pageEngine.current)
      .subscribe((songPage) => {
        this.pageEngine.totalPages = songPage.totalPages;
        this.pageEngine.current = songPage.number;
        this.songList = songPage.content;
      });
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
  singerPage: Page<Singer>;

  addToPlayList(songId: number) {
    if (this.songForPlaylist == songId) {
      this.songForPlaylist = 0;
    } else {
      this.songForPlaylist = songId
    }
  }

  getSingerList() {
    this.singerService
      .getAllSinger(3)
      .subscribe(page => {
        this.singerPage = page;
      })
  }

  getPlaylist() {
    this.playlistService
      .getPlaylist(this.playlistId)
      .subscribe(playlist => {
        this.playlist = playlist;
      })
  }

  next() {
    this.pageEngine.next();
    this.getPlaylistSongList(this.playlistId);
  }

  previous() {
    this.pageEngine.previous();
    this.getPlaylistSongList(this.playlistId);
  }
}
