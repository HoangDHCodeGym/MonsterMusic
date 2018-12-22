import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Singer, Song, SongForm} from "../../../model";
import {SongService} from "../../../service/song.service";
import {SingerService} from "../../../service/singer.service";
import {Router} from "@angular/router";
import * as $ from 'jquery';


@Component({
  selector: 'app-createsong',
  templateUrl: './createsong.component.html',
  styleUrls: ['./createsong.component.css']
})
export class CreatesongComponent implements OnInit {
  newSong: SongForm =  {
    creator: 1,
    gene: 1,
    link: '',
    name: '',
    singer: null
  };
  isLoading: boolean = false;
  currentSongId:number = null;
  currentSinger:string ='';
  srcFile: File;
  singerList: Singer[];
  creMessage: string = '';
  constructor(private songService: SongService,
              private singerService: SingerService,
              private router:Router) { }

  ngOnInit() {
    this.creMessage = '';
  }

  onSubmit(songForm){
    this.isLoading = true;
    this.creMessage = '';
    console.log(songForm);
    // console.log(this.newSong.singer)
    console.log(this.newSong.gene);
    console.log(this.srcFile);
    this.songService.uploadSong(this.newSong,this.srcFile).subscribe(res => {
      if (res != null) {
        this.currentSongId = res.id;
      }
      this.isLoading = false;
      this.creMessage = "success!!";
    });

  }

  appendFile(files:FileList){
    this.srcFile = files.item(0);
  }

  onChange(singerName:string){
    this.singerList =[];
    this.newSong.singer = null;
    if (singerName !=(' '&&'')){
    this.singerService.getSingers(singerName,4)
      .subscribe(res=>{
        if(res!=null)
      {
        document.getElementById('singer').style.color = 'black';
        this.singerList = res.content;
      this.newSong.singer = res.content[0].id
      }else {
      document.getElementById('singer').style.color = 'red';}
      });
    }
  }

  getSinger(singer: Singer){
    this.newSong.singer = singer.id;
    this.currentSinger = singer.name;
  }

  toMusicPage(){
    this.creMessage = '';
    this.songService.getSongsByName(this.newSong.name,1).subscribe(
      resp => {
        this.router.navigate(['/music/' + this.currentSongId]);
      }
    );
    // $('#settings-modal').modal('hide');
  }
}