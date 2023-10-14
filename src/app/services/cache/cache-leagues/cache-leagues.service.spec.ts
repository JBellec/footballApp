import { TestBed } from '@angular/core/testing';

import { CacheLeaguesService } from './cache-leagues.service';

describe('CacheLeaguesService', () => {
  let service: CacheLeaguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheLeaguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
