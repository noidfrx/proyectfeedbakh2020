import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordOlvidadaComponent } from './password-olvidada.component';

describe('PasswordOlvidadaComponent', () => {
  let component: PasswordOlvidadaComponent;
  let fixture: ComponentFixture<PasswordOlvidadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordOlvidadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
