import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UploadSongComponent} from "./songs/upload-song/upload-song.component";
import {UpdateSongComponent} from "./songs/update-song/updateSong.component";

const routes: Routes = [
  {path: 'upload', component: UploadSongComponent},
  {path: 'edit/:id', component: UpdateSongComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
