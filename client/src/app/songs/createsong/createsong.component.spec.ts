import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesongComponent } from './createsong.component';

describe('CreatesongComponent', () => {
  let component: CreatesongComponent;
  let fixture: ComponentFixture<CreatesongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatesongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
