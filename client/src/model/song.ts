import {Singer} from "./singer";
import {User} from "./user";

export class Song {
  id: number;
  name: string;
  creator: User;
  singer: Singer
}
