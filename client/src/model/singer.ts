import {User} from "./user";
import {Song} from "./song";

export class Singer {
  id: number;
  name: string;
  songList: Array<Song>;
  creator: User;
  self:string;
}
