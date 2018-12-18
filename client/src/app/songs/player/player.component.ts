import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {SongService} from "../../../service/song.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  songId:number;
  currentSongURL: string = '';
  constructor(private router: ActivatedRoute,
              @Inject('HOST') private host,
              private songService :SongService) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap:ParamMap)=>{
      this.songId = Number(paramMap.get('id'));
      this.resolveSongResourceUrl();
    })
  }
  resolveSongResourceUrl(){
    this.songService
      .getSongById(this.songId)
      .subscribe((song)=>{
        this.currentSongURL = this.host+'/api/files/'+song.link
      })

  }

}
