import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';
import { Singer } from 'src/model/singer';

@Injectable({
  providedIn: 'root'
})
export class SingerService extends CrudService<Singer> {
  url: string = "http://localhost:8080/api/singers";
  collectionField = "singers";
  itemField = "singer";
}