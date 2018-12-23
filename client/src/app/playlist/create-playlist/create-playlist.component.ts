import {Component, OnInit} from '@angular/core';
import {PlaylistService} from "../../../service/playlist.service";
import {PlaylistForm} from "../../../model";

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {

  playlistForm: PlaylistForm = {
    songList :[],
    description:null,
    creator:1,
    name:null,
  };

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
  }

}
