import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddTaskComponent } from './alert-add-task.component';

describe('AlertAddTaskComponent', () => {
  let component: AlertAddTaskComponent;
  let fixture: ComponentFixture<AlertAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAddTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
