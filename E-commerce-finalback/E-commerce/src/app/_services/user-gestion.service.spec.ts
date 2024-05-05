import { TestBed } from '@angular/core/testing';

import { UserGestionService } from './user-gestion.service';

describe('UserGestionService', () => {
  let service: UserGestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
