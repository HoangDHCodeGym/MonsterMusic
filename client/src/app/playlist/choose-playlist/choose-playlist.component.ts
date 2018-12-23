import {Component, Input, OnInit} from '@angular/core';
import {Page, Playlist} from "../../../model";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.css']
})
export class ChoosePlaylistComponent implements OnInit {
  private _songId: number;
  @Input()
  set songId(songId: number){
    this.listPlaylist();
    this._songId = songId;
    console.log(songId)
  }

  get songId(): number {
    return this._songId
  }

  playlistList: Page<Playlist> = {
    content: [],
    number: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0,
  };
  //TODO:user.
  userId = 1;

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.listPlaylist();
  }

  listPlaylist() {
    this.playlistService
      .getUserPlaylist(this.userId)
      .subscribe(
        page => {
          this.playlistList = page;
        }
      )
  }

  append(pos: number) {

  }

}
