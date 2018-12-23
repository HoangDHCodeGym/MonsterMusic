import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../../service/playlist.service";
import {PlaylistForm} from "../../../model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  status: number;
  creMessage: string = '';
  newPlaylist: PlaylistForm = {
    songList: [],
    description: null,
    creator: 1,
    name: null,
  };

  constructor(private playlistService: PlaylistService) {
  }

  onSubmit(playlistForm: NgForm) {
    if (playlistForm.valid) {
      this.refresh();
      this.playlistService
        .createPlaylist(this.newPlaylist)
        .subscribe((playlist) => {
          if (playlist != null) {
            this.creMessage = 'successfully created '+playlist.name;
            this.status = 1;
            playlistForm.reset()
          } else {
            this.status = -1;
            this.creMessage = 'Please try again'
          }
        })
    } else {
      this.status = -1;
      this.creMessage = 'Please Enter all field'
    }
  }

  ngOnInit() {
    this.status = 0;
  }
  refresh(){
    this.status=0;
    this.creMessage='';
  }

}
