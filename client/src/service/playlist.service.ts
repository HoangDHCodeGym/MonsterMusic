import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import { CrudService } from './crud.service';
import { Playlist } from 'src/model/playlist';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends CrudService<Playlist> {
  url: string = "http://localhost:8080/api/playlists";
  collectionField: string = "playlists";
  itemField: string = "playlist";
}
