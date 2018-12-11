import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {
  url: string = "http://localhost:8080/api/users";
  collectionField: string = "users";
  itemField: string = "user";
}