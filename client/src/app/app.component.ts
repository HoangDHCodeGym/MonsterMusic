import { Component } from '@angular/core';
import { SongService } from 'src/service/song.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private router:Router){
  }
  toHome(evt:Event){
    evt.preventDefault();
    this.router.navigate(['home'])
  }
}
