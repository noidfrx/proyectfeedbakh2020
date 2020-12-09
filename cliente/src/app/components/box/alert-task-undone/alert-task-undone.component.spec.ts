import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTaskUndoneComponent } from './alert-task-undone.component';

describe('AlertTaskUndoneComponent', () => {
  let component: AlertTaskUndoneComponent;
  let fixture: ComponentFixture<AlertTaskUndoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertTaskUndoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTaskUndoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
