import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsingerComponent } from './listsinger.component';

describe('ListsingerComponent', () => {
  let component: ListsingerComponent;
  let fixture: ComponentFixture<ListsingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
