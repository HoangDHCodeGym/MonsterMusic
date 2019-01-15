import {Component, Input, OnInit} from '@angular/core';
import {SingerService} from "../../service/singer.service";
import {Singer} from "../../model";
import {SongService} from "../../service/song.service";
import {Router} from "@angular/router";
import {CommunicateService} from "../../service/communicate.service";

@Component({
  selector: 'app-listsinger',
  templateUrl: './listsinger.component.html',
  styleUrls: ['./listsinger.component.css']
})
export class ListsingerComponent implements OnInit {
  @Input() title: string = '#Singer';
  @Input() size: number = 5;
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
              private router: Router,
              private communicateService: CommunicateService) {
    this.communicateService
      .event
      .songUpdate
      .getObservable()
      .subscribe(() => {
          this.ngOnInit()
        }
      )
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
      }, () => {
        this.singerLoaded = true;
      })

  }

  getSingerByName(singerName: string) {
    this.singerLoaded = false;
    this.singerService
      .getSingers(singerName, this.size)
      .subscribe(resp => {
        if (resp != null) {
          this.singerList = resp.content
        } else {
          this.singerList = [];
        }
        this.singerLoaded = true;
      }, () => {
        this.singerLoaded = true;
      })
  }

  toSingerSong(singerId: number) {
    this.songService
      .getSongsBySinger_Id(singerId, 1)
      .subscribe(resp => {
        if (resp != null) {
          if (resp.content.length != 0) {
            this.router
              .navigate(['music/' + resp.content[0].id])
          } else {
            document.getElementById('err singer song empty').click()
          }
        }
      })

  }

}
