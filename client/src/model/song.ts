import {Singer} from "./singer";
import {User} from "./user";

export class Song {
  id: number;
  creator: User;
  createdDate: string;
  self: string;
  link: string;

  name: string;
  singer: Singer;

}

export class DtoSong {
  name: string;
  singer: string;
  link: string;
}
