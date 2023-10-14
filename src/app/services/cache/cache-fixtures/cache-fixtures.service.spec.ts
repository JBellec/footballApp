import { TestBed } from '@angular/core/testing';

import { CacheFixturesService } from './cache-fixtures.service';

describe('CacheFixturesService', () => {
  let service: CacheFixturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CacheFixturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
