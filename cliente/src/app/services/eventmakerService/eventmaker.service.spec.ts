import { TestBed } from '@angular/core/testing';

import { EventMakerService } from './eventmaker.service';

describe('EventMakerService', () => {
  let service: EventMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
