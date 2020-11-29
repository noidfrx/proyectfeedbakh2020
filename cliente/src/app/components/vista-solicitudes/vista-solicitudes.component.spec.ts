import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaSolicitudesComponent } from './vista-solicitudes.component';

describe('VistaSolicitudesComponent', () => {
  let component: VistaSolicitudesComponent;
  let fixture: ComponentFixture<VistaSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaSolicitudesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
