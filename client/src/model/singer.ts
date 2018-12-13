import {User} from "./user";
import {Song} from "./song";

export class Singer {
  id: number;
  songList: Array<Song>;
  creator: User;
  createdDate: string;
  self: string;

  name: string;
}

export class DtoSinger {
  name: string;
}
