import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModComponent } from './task-mod.component';

describe('TaskModComponent', () => {
  let component: TaskModComponent;
  let fixture: ComponentFixture<TaskModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
