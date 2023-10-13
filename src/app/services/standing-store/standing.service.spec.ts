import { TestBed } from '@angular/core/testing';

import { StandingStoreService } from './standing.service';

describe('StandingStoreService', () => {
  let service: StandingStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StandingStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
