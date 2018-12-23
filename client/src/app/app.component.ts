import { Component } from '@angular/core';
import { SongService } from 'src/service/song.service';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {TokenService} from "../service/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  username: string;
  password: string;
  notification: string;
  constructor(private router: Router, private authService: AuthService, private token: TokenService) {

  }

  signIn(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(response => {
      this.token.saveToken(response.access_token);
      this.notification = "Login successful";
      const username = this.username;
      this.router.navigate(['user/' + username]);
    }, err => {
      console.log(err)
      this.notification = "Login failed, please try again"
    });
  }
}

