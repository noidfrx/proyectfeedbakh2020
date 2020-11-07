import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMakerComponent } from './task-maker.component';

describe('TaskMakerComponent', () => {
  let component: TaskMakerComponent;
  let fixture: ComponentFixture<TaskMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
