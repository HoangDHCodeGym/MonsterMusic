import {Component, Inject, OnInit} from '@angular/core';
import {SongService} from "../../../service/song.service";
import {Song} from "../../../model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-toplist',
  templateUrl: './toplist.component.html',
  styleUrls: ['./toplist.component.css']
})
export class ToplistComponent implements OnInit {
  private songlist: Song[];
  private downloadSongURL: string = '';
  private countRank = 1;
  constructor(private songService: SongService, @Inject('HOST') private host:string,
              private router:Router) { }

  ngOnInit() {
    this.getSongList();
    this.downloadSongURL = this.host+'/api/files/';
    console.log(this.downloadSongURL);
  }

  public getSongList(){
    this.songService.getSongsAndSortByDESC(5).subscribe(res => this.songlist = res.content);
  }

  toMusicPage(id:number){
    this.router.navigate(['music/'+id])
  }

  getFommatOfRankNumber(n: number): string{
    this.countRank++;
    if (n < 9){
      return '0'+n;
    }else {
      return ''+n;
    }
  }
}
