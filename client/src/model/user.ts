import {Playlist} from "./playlist";
import {Singer} from "./singer";
import {Song} from "./song";

export class User {
  id: number;
  name: string;
  playlist: Array<Playlist>;
  singerList: Array<Singer>;
  songList: Array<Song>
}
