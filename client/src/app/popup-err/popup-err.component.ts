import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-err',
  templateUrl: './popup-err.component.html',
  styleUrls: ['./popup-err.component.css']
})
export class PopupErrComponent implements OnInit {
  private _message: string = '';
  @Input()
  set message(message: string) {
    this._message = message;
  }

  get message() {
    return this._message
  }

  constructor() {
  }

  ngOnInit() {
  }

}
