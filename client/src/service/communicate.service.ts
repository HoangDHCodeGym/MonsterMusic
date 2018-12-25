import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommunicateService {
  event = {
    playListUpdate: new TriggerAbleEvent(),
    singerUpdate: new TriggerAbleEvent(),
    songUpdate: new TriggerAbleEvent(),
  };

  constructor() {
  }
}

export class TriggerAbleEvent {
  private evt: Subject<number> = new Subject<number>();
  private status: number = 0;

  constructor() {
    this.evt.next(this.status);
  }

  public trigger() {
    this._switch();
    this.evt.next(this.status);
  }

  public getObservable(): Observable<number> {
    return this.evt
      .asObservable();
  }

  private _switch() {
    if (this.status == 0) {
      this.status = 1;
    } else {
      this.status = 0;
    }
  }
}
