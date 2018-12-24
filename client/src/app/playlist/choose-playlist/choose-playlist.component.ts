import {Component, Input, OnInit} from '@angular/core';
import {Page, Playlist} from "../../../model";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-choose-playlist',
  templateUrl: './choose-playlist.component.html',
  styleUrls: ['./choose-playlist.component.css']
})
export class ChoosePlaylistComponent implements OnInit {
  isLoading: boolean = false;
  success: number = 0;
  message: string = '';
  private _songId: number;
  @Input()
  set songId(songId: number) {
    this.listPlaylist();
    if (songId > 0) {
      this._songId = songId;
    }
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
          if (page != null) {
            this.playlistList = page;
          } else {
            this.isLoading = false;
            this.message = 'no playlist found';
            this.success = -1;
          }
        }, () => {
          this.isLoading = false;
          this.message = 'no playlist found';
          this.success = -1;
        }
      )
  }

  append(pos: number) {
    if (!this.isLoading) {
      this.isLoading = true;
      this.playlistService
        .addSong(this.playlistList.content[pos].id, this.songId)
        .subscribe(
          status => {
            if (status == 200) {
              this.isLoading = false;
              this.message = 'successfully added to '
                + this.playlistList.content[pos].name;
              this.success = 1;
              this.playlistList.content[pos] = null;
            } else {
              this.isLoading = false;
              this.message = 'Failed, please try again';
              this.success = -1;
            }
          }
          , () => {
            this.isLoading = false;
            this.message = 'Failed, please try again';
            this.success = -1;
          })
    }
  }

  refresh() {
    this.isLoading = false;
    this.success = 0;
    this.message = '';
  }

}
