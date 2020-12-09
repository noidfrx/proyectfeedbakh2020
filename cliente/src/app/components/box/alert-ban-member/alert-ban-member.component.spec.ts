import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBanMemberComponent } from './alert-ban-member.component';

describe('AlertBanMemberComponent', () => {
  let component: AlertBanMemberComponent;
  let fixture: ComponentFixture<AlertBanMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBanMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBanMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
