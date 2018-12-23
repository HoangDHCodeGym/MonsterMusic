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
import { CreatesongComponent } from './songs/createsong/createsong.component';
import {FormsModule} from "@angular/forms";
import {SingerService} from "../service/singer.service";
import { SearchComponent } from './search/search.component';
import {AuthService} from "../service/auth.service";
import {TokenService} from "../service/token.service";
import { UserComponent } from './user/user.component';

// const host = "http://45.32.123.20:8080";
const host = "http://localhost:8080";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    ToplistComponent,
    ListsingerComponent,
    CreatesongComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: "HOST", useValue:host}, SongService, SingerService, AuthService, TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
