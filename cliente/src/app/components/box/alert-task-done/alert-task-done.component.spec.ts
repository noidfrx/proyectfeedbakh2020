import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTaskDoneComponent } from './alert-task-done.component';

describe('AlertTaskDoneComponent', () => {
  let component: AlertTaskDoneComponent;
  let fixture: ComponentFixture<AlertTaskDoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertTaskDoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTaskDoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
