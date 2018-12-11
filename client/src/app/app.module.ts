import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {UploadSongComponent} from './songs/upload-song/upload-song.component';
import { UpdatesongComponent } from './songs/updatesong/updatesong.component';

const host: string = 'http://localhost:8080';

@NgModule({
  declarations: [
    AppComponent,
    UploadSongComponent,
    UpdatesongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: 'PLAYLIST_API', useValue: host + '/api/playlists'},
    {provide: 'SONG_API', useValue: host + '/api/songs'},
    {provide: 'USER_API', useValue: host + '/api/users'},
    {provide: 'SINGER_API', useValue: host + '/api/users'},
    {provide: 'HOST_URL', useValue: host}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
