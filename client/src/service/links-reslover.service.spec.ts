import { TestBed } from '@angular/core/testing';

import { LinksResloverService } from './links-reslover.service';

describe('LinksResloverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinksResloverService = TestBed.get(LinksResloverService);
    expect(service).toBeTruthy();
  });
});
