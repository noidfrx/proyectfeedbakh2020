import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBanEventComponent } from './alert-ban-event.component';

describe('AlertBanEventComponent', () => {
  let component: AlertBanEventComponent;
  let fixture: ComponentFixture<AlertBanEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBanEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBanEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
