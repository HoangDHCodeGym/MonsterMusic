import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user";

@Component({
  selector: 'app-samplecrud',
  templateUrl: './samplecrud.component.html',
  styleUrls: ['./samplecrud.component.scss']
})
export class SamplecrudComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.findall();
  }

  findall(): void {
    this.userService.getAll().subscribe(users => {this.users = users; console.log(users)});
  }


}
