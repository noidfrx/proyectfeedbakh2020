import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBanTaskComponent } from './alert-ban-task.component';

describe('AlertBanTaskComponent', () => {
  let component: AlertBanTaskComponent;
  let fixture: ComponentFixture<AlertBanTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBanTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
