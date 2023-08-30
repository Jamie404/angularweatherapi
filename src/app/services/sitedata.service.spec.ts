import { TestBed } from '@angular/core/testing';

import { SitedataService } from './sitedata.service';

describe('SitedataService', () => {
  let service: SitedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
