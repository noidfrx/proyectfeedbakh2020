import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModEventComponent } from './alert-mod-event.component';

describe('AlertModEventComponent', () => {
  let component: AlertModEventComponent;
  let fixture: ComponentFixture<AlertModEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertModEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
