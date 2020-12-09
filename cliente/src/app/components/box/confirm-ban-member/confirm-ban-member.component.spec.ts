import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBanMemberComponent } from './confirm-ban-member.component';

describe('ConfirmBanMemberComponent', () => {
  let component: ConfirmBanMemberComponent;
  let fixture: ComponentFixture<ConfirmBanMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBanMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBanMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
