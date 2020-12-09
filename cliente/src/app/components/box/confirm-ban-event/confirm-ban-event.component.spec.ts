import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBanEventComponent } from './confirm-ban-event.component';

describe('ConfirmBanEventComponent', () => {
  let component: ConfirmBanEventComponent;
  let fixture: ComponentFixture<ConfirmBanEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBanEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBanEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
