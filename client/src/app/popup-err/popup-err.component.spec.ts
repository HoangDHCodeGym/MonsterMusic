import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupErrComponent } from './popup-err.component';

describe('PopupErrComponent', () => {
  let component: PopupErrComponent;
  let fixture: ComponentFixture<PopupErrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupErrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
