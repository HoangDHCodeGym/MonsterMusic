import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MessageService} from "../service/message.service";
import {PlaylistService} from "../service/playlist.service";
import {SingerService} from "../service/singer.service";
import {SongService} from "../service/song.service";
import {UserService} from "../service/user.service";
import {CrudService} from "../service/crud.service";
import {HttpClientModule} from "@angular/common/http";
import { SamplecrudComponent } from './samplecrud/samplecrud.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplecrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CrudService, MessageService, PlaylistService, SingerService, SongService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
