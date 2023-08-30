import { TestBed } from '@angular/core/testing';

import { DailystatsService } from './dailystats.service';

describe('DailystatsService', () => {
  let service: DailystatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailystatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
