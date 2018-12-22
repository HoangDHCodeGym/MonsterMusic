import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {SongService} from "../../../service/song.service";
import * as $ from 'jquery';
import {Song, SongForm} from "../../../model";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  songId:number;
  songGene:string;
  songViews:number;
  songDate: string;
  songTitle: string;
  songSinger: string;
  currentSongURL: string = '';
  downloadSongURL: string = '';
  songList: Array<Song>;
  audio: HTMLAudioElement;
  interval;

  static timeConverter(time: number): string{
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor( time / 60);
    return minutes + ':' + seconds;
  }

  constructor(private router: ActivatedRoute,
              private routerL: Router,
              @Inject('HOST') private host,
              private songService :SongService) {
  }

  ngOnInit() {
    this.downloadSongURL = this.host + '/api/files/';
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      this.songId = Number(paramMap.get('id'));
      this.resolveSongResourceUrl();
    });
  }

  resolveSongResourceUrl() {
    this.songService
      .getSongById(this.songId)
      .subscribe((song)=>{
        this.currentSongURL = this.host+'/api/files/'+song.link;
        this.audio = new Audio(this.currentSongURL);
        this.songDate = song.createdDate;
        this.songTitle = song.name;
        this.songSinger = (song.singer.name != null) ? song.singer.name : '';
        this.songViews = song.views;
        this.songGene = song.gene.name;
        this.getSongList(this.songSinger);
      })
  }

  getSongList(singerName: string): void {
    this.songService.getSongs().subscribe((songPage) => {
      this.songList = songPage.content;
      while (this.songList.length > 5) {
        this.songList.pop();
      }
      }
    );
  }

  clickPlayBtn(): void {
    const playBtn = $('#playBtn');
    if (playBtn.hasClass('fa-play')) {
      this.audio.play();
      playBtn.addClass('fa-pause');
      playBtn.removeClass('fa-play');
      $('#song_duration').text(PlayerComponent.timeConverter(this.audio.duration));
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
    this.interval = setInterval(function() {
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

  toMusicPage(id: number){
    this.routerL.navigate(['/music/'+id]);
  }

}
