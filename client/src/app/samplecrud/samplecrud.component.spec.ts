import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplecrudComponent } from './samplecrud.component';

describe('SamplecrudComponent', () => {
  let component: SamplecrudComponent;
  let fixture: ComponentFixture<SamplecrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplecrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplecrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
