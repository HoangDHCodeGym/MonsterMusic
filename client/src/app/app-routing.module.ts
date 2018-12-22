import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlayerComponent} from "./songs/player/player.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: 'music/:id', component: PlayerComponent},
  {path: 'home', component: HomeComponent},
  {path:'',redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
