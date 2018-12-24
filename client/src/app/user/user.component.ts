import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: string;

  constructor(private http : HttpClient,
              @Inject('HOST') private host,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.username = this.route.snapshot.params['username'];
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      this.username = paramMap.get('username');
      this.http.post(this.host + "/sample/name/" + this.username, '').subscribe(response => {
        console.log(response);
      })
    });
  }

}
