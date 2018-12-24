import {Component, Input, OnInit} from '@angular/core';
import {SingerService} from "../../service/singer.service";
import {Singer} from "../../model";
import {SongService} from "../../service/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-listsinger',
  templateUrl: './listsinger.component.html',
  styleUrls: ['./listsinger.component.css']
})
export class ListsingerComponent implements OnInit {
  @Input() title: string = 'Singer';
  singerLoaded: boolean = false;
  private _singerName;
  @Input()
  set singerName(singerName: string) {
    this._singerName = singerName;
    this.getSingerByName(singerName)
  }

  get singerName() {
    return this._singerName
  }

  singerList: Singer[] = [];

  constructor(private singerService: SingerService,
              private songService: SongService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.singerName) {
      this.getSingerByName(this.singerName)
    } else {
      this.getAllSingers();
    }
  }

  getAllSingers() {
    this.singerLoaded = false;
    this.singerService
      .getAllSinger(5)
      .subscribe(resp => {
        this.singerList = resp.content;
        this.singerLoaded = true;
      },()=>{this.singerLoaded = true;})

  }

  getSingerByName(singerName: string) {
    this.singerLoaded = false;
    this.singerService
      .getSingers(singerName, 5)
      .subscribe(resp => {
        if (resp != null) {
          this.singerList = resp.content
        } else {
          this.singerList = [];
        }
        this.singerLoaded = true;
      },()=>{this.singerLoaded = true;})
  }

  toSingerSong(singerId: number) {
    this.songService
      .getSongsBySinger_Id(singerId, 1)
      .subscribe(resp => {
        if (resp != null) {
          this.router
            .navigate(['music/' + resp.content[0].id])
        }
      })

  }

}
