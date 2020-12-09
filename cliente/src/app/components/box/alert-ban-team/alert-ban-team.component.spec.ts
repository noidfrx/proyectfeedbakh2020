import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBanTeamComponent } from './alert-ban-team.component';

describe('AlertBanTeamComponent', () => {
  let component: AlertBanTeamComponent;
  let fixture: ComponentFixture<AlertBanTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertBanTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBanTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
