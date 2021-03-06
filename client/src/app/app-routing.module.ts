import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlayerComponent} from "./songs/player/player.component";
import {HomeComponent} from "./home/home.component";
import {SearchListComponent} from "./search/search-list/search-list.component";
import {PlaylistPlayerComponent} from "./playlist/playlist-player/playlist-player.component";

const routes: Routes = [
  {path: 'music/:id', component: PlayerComponent},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'search/:q', component: SearchListComponent},
  {path: 'playlist/:pid/music/:mid', component: PlaylistPlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
