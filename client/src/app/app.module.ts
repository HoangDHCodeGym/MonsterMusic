import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UploadSongComponent} from './songs/upload-song/upload-song.component';
import {UpdateSongComponent} from './songs/update-song/updateSong.component';
import {StreamSongComponent} from './songs/stream-song/stream-song.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from "../service/auth.service";
import {TokenStorage} from "./token.storage";
import {Interceptor} from "./app.interceptor";


const host: string = 'http://localhost:8080' || window.location.protocol + "//" + window.location.host;
console.log(host);

@NgModule({
  declarations: [
    AppComponent,
    UploadSongComponent,
    UpdateSongComponent,
    StreamSongComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {provide: 'PLAYLIST_API', useValue: host + '/api/playlists'},
    {provide: 'SONG_API', useValue: host + '/api/songs'},
    {provide: 'USER_API', useValue: host + '/api/users'},
    {provide: 'SINGER_API', useValue: host + '/api/users'},
    {provide: 'HOST_URL', useValue: host},
    AuthService,
    TokenStorage,
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
