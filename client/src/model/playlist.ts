import {Song} from "./song";
import {User} from "./user";

export class Playlist {
  id: number;
  name: string;
  songList: Array<Song>;
  creator: User;
}
