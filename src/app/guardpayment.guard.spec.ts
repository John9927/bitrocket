import { TestBed } from '@angular/core/testing';

import { GuardpaymentGuard } from './guardpayment.guard';

describe('GuardpaymentGuard', () => {
  let guard: GuardpaymentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardpaymentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
