import { TestBed } from '@angular/core/testing';

import { CacheStandingsService } from './cache-standing.service';

describe('CacheStandingsService', () => {
  let service: CacheStandingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheStandingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
