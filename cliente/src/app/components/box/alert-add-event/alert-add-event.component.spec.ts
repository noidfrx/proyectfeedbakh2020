import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddEventComponent } from './alert-add-event.component';

describe('AlertAddEventComponent', () => {
  let component: AlertAddEventComponent;
  let fixture: ComponentFixture<AlertAddEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAddEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
