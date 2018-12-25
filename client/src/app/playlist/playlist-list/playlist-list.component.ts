import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from "../../../model";
import {PlaylistService} from "../../../service/playlist.service";
import {SongService} from "../../../service/song.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {
  playlistLoaded: boolean = false;
  @Input() size: number = 5;
  @Input() title: string = '#Playlist';
  private _playlistName;
  @Input()
  set playlistName(playlistName: string) {
    this._playlistName = playlistName;
    this.getPlaylistByName(playlistName)
  }

  get playlistName() {
    return this._playlistName
  }

  playlistList: Playlist[] = [];

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.playlistName) {
      this.getPlaylistByName(this.playlistName)
    } else {
      this.getAllPlaylists();
    }
  }

  getAllPlaylists() {
    this.playlistLoaded = false;
    this.playlistService
      .getAllPlaylist(5)
      .subscribe(resp => {
        this.playlistList = resp.content;
        this.playlistLoaded = true;
      }, () => {
        this.playlistLoaded = true;
      })

  }

  getPlaylistByName(playlistName: string) {
    this.playlistLoaded = false;
    this.playlistService
      .getPlaylistByName(playlistName, this.size)
      .subscribe(resp => {
        if (resp != null) {
          this.playlistList = resp.content
        } else {
          this.playlistList = [];
        }
        this.playlistLoaded = true;
      }, () => {
        this.playlistLoaded = true;
      })
  }

  toPlaylistSong(playlistId: number) {
    this.songService
      .getSongsByPlaylist_Id(playlistId, 1)
      .subscribe(resp => {
        if (resp != null) {
          if (resp.content.length != 0) {
            this.router
              .navigate(['playlist/' + playlistId + '/music/' + resp.content[0].id])
          } else {
            document.getElementById('err playlist empty').click()
          }
        }
      })

  }


}
