import {Component, Input, OnInit} from '@angular/core';
import {SingerService} from "../../service/singer.service";
import {Singer} from "../../model";

@Component({
  selector: 'app-listsinger',
  templateUrl: './listsinger.component.html',
  styleUrls: ['./listsinger.component.css']
})
export class ListsingerComponent implements OnInit {
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

  constructor(private singerService: SingerService) {
  }

  ngOnInit() {
    if (this.singerName) {
      this.getSingerByName(this.singerName)
    } else {
      this.getAllSingers();
    }
  }

  getAllSingers() {
    this.singerService
      .getAllSinger(5)
      .subscribe(resp => {
        this.singerList = resp.content
      })

  }

  getSingerByName(singerName: string) {
    this.singerService
      .getSingers(singerName, 5)
      .subscribe(resp => {
        if (resp != null) {
          this.singerList = resp.content
        } else {
          this.singerList = [];
        }
      })
  }

}
