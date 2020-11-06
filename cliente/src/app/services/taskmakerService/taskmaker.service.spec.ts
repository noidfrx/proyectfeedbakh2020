import { TestBed } from '@angular/core/testing';

import { TaskMakerService } from './taskmaker.service';

describe('TaskmakerService', () => {
  let service: TaskMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
