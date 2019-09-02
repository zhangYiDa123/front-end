import { TestBed } from '@angular/core/testing';

import { HttpServeService } from '../http-serve.service';

describe('HttpServeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpServeService = TestBed.get(HttpServeService);
    expect(service).toBeTruthy();
  });
});
