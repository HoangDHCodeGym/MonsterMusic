import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-err',
  templateUrl: './popup-err.component.html',
  styleUrls: ['./popup-err.component.css']
})
export class PopupErrComponent implements OnInit {
  private _message: string = '';
  private _modalName: string = 'pop-up-err';
  originModalName: string = 'pop-up-err';

  @Input()
  set modalName(modalName: string) {
    this.originModalName = modalName;
    this._modalName = modalName.split(' ').join('-');
  }

  get modalName() {
    return this._modalName;
  }

  @Input()
  set message(message: string) {
    this._message = message;
  }

  get message() {
    return this._message
  }

  @Output() closed: EventEmitter<void> = new EventEmitter<void>()

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.closed.emit();
  }

}
