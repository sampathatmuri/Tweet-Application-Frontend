import { TestBed } from '@angular/core/testing';

import { SamGuard } from './sam.guard';

describe('SamGuard', () => {
  let guard: SamGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SamGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
