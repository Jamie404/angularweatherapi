import { TestBed } from '@angular/core/testing';

import { LivemapService } from './livemap.service';

describe('LivemapService', () => {
  let service: LivemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
