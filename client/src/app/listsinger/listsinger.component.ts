import { Component, OnInit } from '@angular/core';
import {SingerService} from "../../service/singer.service";
import {Singer} from "../../model";

@Component({
  selector: 'app-listsinger',
  templateUrl: './listsinger.component.html',
  styleUrls: ['./listsinger.component.css']
})
export class ListsingerComponent implements OnInit {
  singerList: Singer[]=[];

  constructor(private singerService:SingerService) { }

  ngOnInit() {
    this.getAllSingers();
  }
  getAllSingers(){
    this.singerService
      .getAllSinger(5)
      .subscribe(resp=>{
        this.singerList=resp.content})

  }

}
