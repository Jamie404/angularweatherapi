import { TestBed } from '@angular/core/testing';

import { ChosenService } from './chosen.service';

describe('ChosenService', () => {
  let service: ChosenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChosenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
