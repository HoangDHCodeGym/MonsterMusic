import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SongService} from 'src/service/song.service';
import {HomeComponent} from './home/home.component';
import {PlayerComponent} from './songs/player/player.component';
import {ToplistComponent} from './songs/toplist/toplist.component';
import {ListsingerComponent} from './listsinger/listsinger.component';
import {CreatesongComponent} from './songs/createsong/createsong.component';
import {FormsModule} from "@angular/forms";
import {SingerService} from "../service/singer.service";
import {SearchComponent} from './search/search.component';
import {CreatePlaylistComponent} from './playlist/create-playlist/create-playlist.component';
import {ChoosePlaylistComponent} from './playlist/choose-playlist/choose-playlist.component';
import {SearchListComponent} from './search/search-list/search-list.component';
import {UserComponent} from "./user/user.component";
import { PlaylistPlayerComponent } from './playlist/playlist-player/playlist-player.component';
import { PlaylistListComponent } from './playlist/playlist-list/playlist-list.component';

// const location = window.location;
// const host = location.protocol + '//' + location.host;
// console.log(host);

const host = 'http://localhost:8080';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    ToplistComponent,
    ListsingerComponent,
    CreatesongComponent,
    SearchComponent,
    CreatePlaylistComponent,
    ChoosePlaylistComponent,
    SearchListComponent,
    UserComponent,
    PlaylistPlayerComponent,
    PlaylistListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: "HOST", useValue: host}, SongService, SingerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
