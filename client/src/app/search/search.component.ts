import { Component, OnInit } from '@angular/core';
import {SongService} from "../../service/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchResult;

  constructor(private songService: SongService,
              private router: Router) { }

  ngOnInit() {
  }

  search(e: string){
    this.searchResult = [];
    if(e!=''||e.length!=0){
      this.songService.getSongsByName(e,4).subscribe(resp => {
        this.searchResult = resp.content;
      })
    }
  }

  toMusicPage(id: number) {
    this.searchResult = [];
    this.router.navigate(['music/' + id])
  }
}
