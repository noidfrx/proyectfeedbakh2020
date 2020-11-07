import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMakerComponent } from './event-maker.component';

describe('EventMakerComponent', () => {
  let component: EventMakerComponent;
  let fixture: ComponentFixture<EventMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
