import { Component } from '@angular/core';
import { SongService } from 'src/service/song.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(private songService: SongService){
  }
}
