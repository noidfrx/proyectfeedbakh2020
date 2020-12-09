import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertAddMemberComponent } from './alert-add-member.component';

describe('AlertAddMemberComponent', () => {
  let component: AlertAddMemberComponent;
  let fixture: ComponentFixture<AlertAddMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertAddMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
