/**  data form server **/
export interface Song {
  id: number,
  name: string,
  link: string,

  creator: User,
  Singer: Singer,

  views: number,
  createdDate: string //maybe Date, not sure
}

interface Singer {
  id: number
  name: string,
  songList: number //the length of song list

  creator: User,

  createdDate: string //maybe Date, not sure
}

interface Playlist {
  id: number,
  name: number,
  songList: number,//the length of the song list

  creator: User,

  views: number,
  createdDate: string //maybe Date, not sure
}

interface User {
  id: number,
  username: string,
  name: string,

  songList: number,     //the length of the list
  playlistList: number,//the length of the list
  singerList: number, //the length of the list

  createdDate: string //maybe Date, not sure
}

/** data to server **/
interface SongForm {
  name: string,
  link: string,

  creator: number, //user id
  singer: number, //singer id
}

interface SingerForm {
  name: string,

  creator: number,
}

interface PlaylistForm {
  name: string,

  creator: number,
  songList: number[], // array of songId
}

interface UserForm {
  name: string,
  username: string,
  password: string,
}

export interface Page<T> {
  content:T[],
  number: number
  size: number,
  totalElements: number,
  totalPages: number,
}