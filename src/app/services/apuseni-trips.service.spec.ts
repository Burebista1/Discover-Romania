import { TestBed } from '@angular/core/testing';

import { ApuseniTripsService } from './apuseni-trips.service';

describe('ApuseniTripsService', () => {
  let service: ApuseniTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApuseniTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
