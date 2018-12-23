/**  data form server **/
export interface Song {
  id: number,
  name: string,
  link: string,
  favor: number,

  gene: Gene,
  creator: User,
  singer: Singer,

  views: number,
  createdDate: string //maybe Date, not sure
}

export interface Singer {
  id: number
  name: string,
  songList: number //the length of song list
  age: number,
  favor: number,
  description: string,

  creator: User,

  createdDate: string //maybe Date, not sure
}

export interface Playlist {
  id: number,
  name: number,
  songList: number,//the length of the song list
  favor: number,
  description: string,

  creator: User,

  views: number,
  createdDate: string //maybe Date, not sure
}

interface User {
  id: number,
  username: string,
  name: string,
  email:string,
  age:number,

  songList: number,     //the length of the list
  playlistList: number,//the length of the list
  singerList: number, //the length of the list

  createdDate: string //maybe Date, not sure
}

/** data to server **/
export interface SongForm {
  name: string,
  link: string,

  gene: number,
  creator: number, //user id
  singer: number, //singer id
}

export interface SingerForm {
  name: string,
  age: number,
  description: string,

  creator: number,
}

export interface PlaylistForm {
  name: string,
  description: string,

  creator: number,
  songList: number[], // array of songId
}

interface UserForm {
  name: string,
  username: string,
  password: string,
  email:string,
  age:number,
}

export interface Page<T> {
  content:T[],
  number: number
  size: number,
  totalElements: number,
  totalPages: number,
}

interface Gene {
  id: number,
  name: string,
  description: string
}
