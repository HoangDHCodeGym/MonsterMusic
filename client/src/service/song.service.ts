import { Song } from './../model/song';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongService extends CrudService<Song> {
  url: string = "http://localhost:8080/api/songs";
  collectionField: string = "songs";
  itemField: string = "song";
}
