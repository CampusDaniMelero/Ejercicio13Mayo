import { TestBed } from '@angular/core/testing';

import { UsuarioFormService } from './usuario-form.service';

describe('UsuarioFormService', () => {
  let service: UsuarioFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
