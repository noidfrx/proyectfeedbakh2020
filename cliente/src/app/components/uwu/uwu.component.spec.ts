import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UwuComponent } from './uwu.component';

describe('UwuComponent', () => {
  let component: UwuComponent;
  let fixture: ComponentFixture<UwuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UwuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UwuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
