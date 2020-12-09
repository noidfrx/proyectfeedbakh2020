import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBanTaskComponent } from './confirm-ban-task.component';

describe('ConfirmBanTaskComponent', () => {
  let component: ConfirmBanTaskComponent;
  let fixture: ComponentFixture<ConfirmBanTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBanTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBanTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
