import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAcceptedComponent } from './payment-accepted.component';

describe('PaymentAcceptedComponent', () => {
  let component: PaymentAcceptedComponent;
  let fixture: ComponentFixture<PaymentAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAcceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
