import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddTeamComponent } from './alert-add-team.component';

describe('AlertAddTeamComponent', () => {
  let component: AlertAddTeamComponent;
  let fixture: ComponentFixture<AlertAddTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAddTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
