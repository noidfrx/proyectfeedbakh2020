import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModComponent } from './event-mod.component';

describe('EventModComponent', () => {
  let component: EventModComponent;
  let fixture: ComponentFixture<EventModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
