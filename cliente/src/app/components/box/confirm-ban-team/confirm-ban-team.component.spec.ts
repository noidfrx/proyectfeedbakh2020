import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBanTeamComponent } from './confirm-ban-team.component';

describe('ConfirmBanTeamComponent', () => {
  let component: ConfirmBanTeamComponent;
  let fixture: ComponentFixture<ConfirmBanTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmBanTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBanTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
