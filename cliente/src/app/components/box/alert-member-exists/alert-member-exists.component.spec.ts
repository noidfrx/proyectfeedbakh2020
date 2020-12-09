import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertMemberExistsComponent } from './alert-member-exists.component';

describe('AlertMemberExistsComponent', () => {
  let component: AlertMemberExistsComponent;
  let fixture: ComponentFixture<AlertMemberExistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertMemberExistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertMemberExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
