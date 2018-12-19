import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongService } from 'src/service/song.service';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './songs/player/player.component';
import { ToplistComponent } from './songs/toplist/toplist.component';
import { ListsingerComponent } from './listsinger/listsinger.component';

const host = "http://45.32.123.20:8080";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    ToplistComponent,
    ListsingerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide: "HOST",useValue:host}, SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
