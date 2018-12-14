import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsingersComponent } from './listsingers.component';

describe('ListsingersComponent', () => {
  let component: ListsingersComponent;
  let fixture: ComponentFixture<ListsingersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsingersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsingersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
