import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModTaskComponent } from './alert-mod-task.component';

describe('AlertModTaskComponent', () => {
  let component: AlertModTaskComponent;
  let fixture: ComponentFixture<AlertModTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertModTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
