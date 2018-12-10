import { Injectable } from '@angular/core';
import {CrudService} from "./crud.service";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User>{
  url: string = "http://localhost:8080/api/users";
}
