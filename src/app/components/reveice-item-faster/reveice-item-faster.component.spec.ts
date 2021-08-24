import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReveiceItemFasterComponent } from './reveice-item-faster.component';

describe('ReveiceItemFasterComponent', () => {
  let component: ReveiceItemFasterComponent;
  let fixture: ComponentFixture<ReveiceItemFasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReveiceItemFasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReveiceItemFasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
