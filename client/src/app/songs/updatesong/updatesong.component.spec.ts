import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesongComponent } from './updatesong.component';

describe('UpdatesongComponent', () => {
  let component: UpdatesongComponent;
  let fixture: ComponentFixture<UpdatesongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
