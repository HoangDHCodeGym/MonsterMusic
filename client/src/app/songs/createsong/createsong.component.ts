import {Component, OnInit} from '@angular/core';
import {Singer, Song, SongForm} from "../../../model";
import {SongService} from "../../../service/song.service";
import {SingerService} from "../../../service/singer.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {
  newSong: SongForm = {
    creator: 1,
    gene: 1,
    link: '',
    name: '',
    singer: null
  };
  isFailed: boolean = false;
  isLoading: boolean = false;
  currentSongId: number = null;
  currentSinger: string = '';
  currentUrlToMusicPage: string = '';
  srcFile: File;
  singerList: Singer[];
  creMessage: string = '';

  constructor(private songService: SongService,
              private singerService: SingerService) {
  }

  ngOnInit() {
    this.creMessage = '';
  }

  onSubmit(songForm: NgForm) {
    if (songForm.valid) {
      this.isLoading = true;
      this.creMessage = '';
      console.log(songForm);
      console.log(this.newSong.gene);
      console.log(this.srcFile);
      this.songService
        .uploadSong(this.newSong, this.srcFile).subscribe(res => {
        this.isLoading = false;
        songForm.reset();
        if (res != null) {
          this.currentSongId = res.id;
          this.currentUrlToMusicPage = '/music/' + this.currentSongId;
          this.creMessage = "success!!";
          this.isFailed = false;
        } else {
          this.isFailed = true;
          this.creMessage = 'Failed, please try again !'
        }
      });
    }
  }

  appendFile(files: FileList) {
    this.srcFile = files.item(0);
  }

  onChange(singerName: string) {
    this.singerList = [];
    this.newSong.singer = null;
    if (singerName != (' ' && '')) {
      this.singerService.getSingers(singerName, 4)
        .subscribe(res => {
          if (res != null) {
            document.getElementById('singer').style.color = 'black';
            this.singerList = res.content;
            this.newSong.singer = res.content[0].id
          } else {
            document.getElementById('singer').style.color = 'red';
          }
        });
    }
  }

  getSinger(singer: Singer) {
    this.newSong.singer = singer.id;
    this.currentSinger = singer.name;
  }

  refresh() {
    this.creMessage = '';
    this.isFailed = false;
    this.isLoading = false;
  }
}
