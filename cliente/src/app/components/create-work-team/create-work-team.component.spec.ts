import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkTeamComponent } from './create-work-team.component';

describe('CreateWorkTeamComponent', () => {
  let component: CreateWorkTeamComponent;
  let fixture: ComponentFixture<CreateWorkTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWorkTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
