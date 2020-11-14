import { TestBed } from '@angular/core/testing';

import { ComprobarIngresoService } from './comprobar-ingreso.service';

describe('ComprobarIngresoService', () => {
  let service: ComprobarIngresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobarIngresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
